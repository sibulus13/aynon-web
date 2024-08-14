import React from 'react';
import { useState } from 'react';
import { uploadPost } from '@/lib/supabase';
const Post = ({ user, coord, region, region_id }) => {
    const [content, setContent] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) {
            console.log('Please enter a post');
            return;
        }
        await uploadPost(user, content, coord, region_id)
    }

    return (
        <div>
            <form className='border-2 border-black'>
                <div>
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Post;