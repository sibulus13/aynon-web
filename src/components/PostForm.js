import React from 'react';

const PostForm = ({ content, setContent }) => {
    const textarea = document.getElementById('content');
    if (textarea) {
        textarea.addEventListener("input", function () {
            this.style.height = "auto";  // Reset height to auto
            this.style.height = (this.scrollHeight) + "px";  // Set new height based on scroll height
            if (!content) {
                this.style.height = "auto";
            }
        });
    }

    return (
        <div className='h-full flex-col'>
            <form className='grow'>
                <textarea
                    id='content'
                    type="text"
                    className='h-full w-full p-2'
                    value={content}
                    placeholder={"What's on your mind?"}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={500}
                    resize='none'
                />
            </form>
        </div>
    );
};

export default PostForm;