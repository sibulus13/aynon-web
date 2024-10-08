import React from 'react';

const PostForm = ({ content, setContent }) => {
    return (
        <div className='h-full flex-col'>
            <form className='grow'>
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

export default PostForm;