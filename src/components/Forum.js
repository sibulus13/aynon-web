import React, { useEffect, useState } from 'react';
import { getPosts } from '@/lib/supabase';
import { timeSince } from '@/lib/time';
import { random_canadian_animal } from '@/lib/user';

const Forum = ({ coord }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getPosts(coord);
            setPosts(posts);
        }
        fetchPosts();
    }, []);
    return (
        <div className='grid gap-2 py-2'>
            {posts.map(post => (
                <div key={post.id} className='border-2 rounded-3xl p-2'>
                    <p>{post.location_name} {random_canadian_animal(post.user_id)} | {timeSince(post.created_at)}</p>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Forum;