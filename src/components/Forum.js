import React, { useEffect, useState } from 'react';
import Entry from './Entry';
import { getPosts } from '@/lib/supabase';
import dummyData from '@/mock_data/forum';
const Forum = ({ coord, setPage, setPost }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getPosts(coord);
            // setPosts(dummyData);
            // setPosts([]);
            setPosts(posts);
        }
        fetchPosts();
    }, []);

    function toComments(post) {
        setPage('comment');
        setPost(post);
    }

    return (
        <div className='grid gap-4 py-4'>
            {posts.map(post => (
                <Entry post={post} key={post.id} onClick={() => toComments(post)} />
            ))}
        </div>
    );
};

export default Forum;