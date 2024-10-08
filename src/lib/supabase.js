import { createClient } from '@supabase/supabase-js'

// tables are as such:
// locations: id, created_at, name, type

// Create a single supabase client for interacting with your database
const SB_URL = process.env.NEXT_PUBLIC_SB_URL
const SB_KEY = process.env.NEXT_PUBLIC_SB_KEY
const supabase = createClient(SB_URL, SB_KEY)

export default supabase

function uploadLocation(name, type, parent_id = null) {
    return supabase
        .from('locations')
        .insert([
            { name: name, type: type, parent_id: parent_id }
        ])
}

// check if a location with the name and type already exists
function getLocation(name, type) {
    return supabase
        .from('locations')
        .select('name')
        .eq('name', name)
        .eq('type', type)
}

// find the id of a location with the name and type
export async function findLocationId(name, type) {
    return supabase
        .from('locations')
        .select('id')
        .eq('name', name)
        .eq('type', type)
}

// Adds locations to the database starting with the country and working down to the neighborhood.
export async function storeGoogleLocations(data) {
    let addresses = data.results[0].address_components.reverse();
    for (let i = 0; i < addresses.length; i++) {
        const currentElement = data.results[0].address_components[i];
        const currentElementType = currentElement.types[0];
        const location = await getLocation(currentElement.long_name, currentElementType);
        if (location.error) {
            console.error(location.error);
            return;
        }
        const locationExists = location.data.length > 0;
        if (!locationExists) {
            let lastElementId = null;
            if (i > 0) {
                const lastElement = data.results[0].address_components[i - 1];
                const parent_location = await findLocationId(lastElement.long_name, lastElement.types[0])
                if (parent_location.error) {
                    console.error(parent_location.error);
                    return;
                }
                lastElementId = parent_location.data[0].id;
            }
            // TODO: For whatever reason, even with the constraint of unique type and name, the country is still being uploaded twice.
            let response = await uploadLocation(currentElement.long_name, currentElementType, lastElementId);
        }
    }
}

export async function uploadPost(user_id, content, coord, region_id, userAnimal) {
    coord = `POINT(${coord.longitude} ${coord.latitude})`
    const { error } = await supabase
        .from('posts')
        .insert(
            {
                content: content,
                coordinate: coord,
                user_id: user_id,
                location_id: region_id,
                animal: userAnimal
            }
        )
}

// return all posts near a coordinate
export async function getPosts(coord, user_id) {
    const { data, error } = await supabase.rpc('nearby_posts',
        { lat: coord.latitude, long: coord.longitude, userid: user_id })
    if (error) {
        console.error(error);
        return [];
    }
    return data;
}

export async function uploadComment(user_id, post_id, content, userAnimal, region_id) {
    const { error } = await supabase
        .from('comments')
        .insert(
            {
                content: content,
                user_id: user_id,
                post_id: post_id,
                animal: userAnimal,
                location_id: region_id
            }
        )
}

export async function getComments(post_id, user_id) {
    const { data, error } = await supabase.rpc('get_comments',
        { postid: post_id, userid: user_id })
    if (error) {
        console.error(error);
        return [];
    }
    return data;
}

export async function uploadFeedback(name, email, content) {
    const { error } = await supabase
        .from('feedback')
        .insert(
            {
                name: name,
                email: email,
                content: content
            }
        )
}

export async function upsertPostVote(user_id, post_id, vote) {
    const { data, error } = await supabase
        .from('votes')
        .upsert(
            {
                user_id: user_id,
                post_id: post_id,
                vote_type: vote
            },
            { onConflict: ['user_id', 'post_id'] }
        )
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function upsertCommentVote(user_id, comment_id, vote) {
    const { data, error } = await supabase
        .from('votes')
        .upsert(
            {
                user_id: user_id,
                comment_id: comment_id,
                vote_type: vote
            },
            { onConflict: ['user_id', 'comment_id'] }
        )
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}