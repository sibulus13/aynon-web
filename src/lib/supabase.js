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
function checkLocation(name, type) {
    return supabase
        .from('locations')
        .select('name')
        .eq('name', name)
        .eq('type', type)
}

// find the id of a location with the name and type
function findLocationId(name, type) {
    return supabase
        .from('locations')
        .select('id')
        .eq('name', name)
        .eq('type', type)
}

export async function storeGoogleLocations(data) {
    for (let i = data.results[0].address_components.length - 1; i >= 0; i--) {
        const currentElement = data.results[0].address_components[i];
        const currentElementType = currentElement.types[0];
        const { locationExists, error } = await checkLocation(currentElement.long_name, currentElementType);
        console.log(locationExists);
        if (!locationExists) {
            console.log('no location found');
            let lastElementId = null;
            if (i > 0) {
                const lastElement = data.results[0].address_components[i - 1];
                const data2 = await findLocationId(lastElement.long_name, lastElement.types[0])
                console.log(data2);
                lastElementId = data2.data[0].id || null;
            }
            const location = {
                name: currentElement.long_name,
                type: currentElementType,
                parent_id: lastElementId
            }
            console.log(location);
            await uploadLocation(currentElement.long_name, currentElementType, lastElementId);
        }
    }
}