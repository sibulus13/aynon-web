import React from 'react';
import { uploadPost } from '@/lib/supabase';
const UploadPost = ({ user, userAnimal, coord, region_id, content, setContent, setPage }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) {
            console.log('Please enter a post');
            return;
        }
        await uploadPost(user, content, coord, region_id, userAnimal);
        setContent('');
        setPage('forum');
    }

    return (
        <div className='h-full'>
            <div className='flex justify-end py-2'>
                <button
                    className='text-right font-semibold disabled:text-gray-400'
                    disabled={!content}
                    onClick={handleSubmit}>
                    <span>
                        Send
                    </span>
                </button>
            </div>
            <form className='h-5/6 flex-col'>
                <textarea
                    type="text"
                    className='h-full w-full p-2'
                    value={content}
                    placeholder={"What's on your mind?"}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={1500}
                    resize='none'
                />
            </form>
        </div>
    );
};

export default UploadPost;