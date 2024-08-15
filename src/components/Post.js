import React from 'react';
import { uploadPost } from '@/lib/supabase';
const Post = ({ user, coord, region_id, back, content, setContent }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) {
            console.log('Please enter a post');
            return;
        }
        await uploadPost(user, content, coord, region_id);
        setContent('');
    }

    return (
        <div className='h-full'>
            <div className='flex justify-between py-2 pb-10'>
                <button onClick={back}>
                    Back Btn
                </button>
                <button
                    disabled={!content}
                    className='text-right disabled:text-gray-200'
                    onClick={handleSubmit}>
                    <span>
                        Send
                    </span>
                </button>
            </div>
            <form className='h-full flex-col'>
                <textarea
                    type="text"
                    className='h-full w-full'
                    value={content}
                    placeholder={"What's on your mind?"}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={1500}
                />
            </form>
        </div>
    );
};

export default Post;