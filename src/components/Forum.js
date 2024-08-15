import React, { useEffect, useState } from 'react';
import { getPosts } from '@/lib/supabase';
import { timeSince } from '@/lib/time';
import { random_canadian_animal } from '@/lib/user';
import dummyData from '@/mock_data/forum';
const Forum = ({ coord }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getPosts(coord);
            setPosts(dummyData);
            // setPosts([]);
            // setPosts(posts);
        }
        fetchPosts();
    }, []);

    return (
        <div className='grid gap-4 py-2'>
            {posts.map(post => (
                <div key={post.id}
                    className='border-2 rounded-3xl p-2 max-w-4/5 grid gap-2'>
                    <div className='h-[calc(1.5em*2)] overflow-ellipsis line-clamp-2'>
                        <span className='text-xs'>{post.location_name}</span>
                        {' '}
                        <span className='text-xs'>{random_canadian_animal(post.user_id)}</span>
                        <p className='text-xs'>{timeSince(post.created_at)}</p>
                    </div>
                    <div class="h-[calc(1.5em*3)] overflow-hidden line-clamp-3">
                        <p className='line-clamp-3 text-ellipsis overflow-hidden break-all'>{post.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Forum;