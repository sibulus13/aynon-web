import React, { useEffect, useState } from 'react';
import { getPosts } from '@/lib/supabase';
import { timeSince } from '@/lib/time';

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
                    <p>{post.location_name} {post.user_id || 'Moose'} | {timeSince(post.created_at)}</p>
                    <p>{post.content}</p>
                    {/* <p>{post.vote}</p> */}
                </div>
            ))}
        </div>
    );
};

export default Forum;