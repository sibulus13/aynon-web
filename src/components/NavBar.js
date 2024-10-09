import React from 'react';
import { IoIosSend } from "react-icons/io";

const NavBar = ({ page, send, content, setContent }) => {

    const showSubmit = page === 'comment' || page === 'post' || page === 'feedback';
    const showTextInput = page === 'comment' || page === 'feedback';
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
        showSubmit ?
            <div>
                <form className='justify-center items-center'>
                    {showTextInput ?
                        <div className='flex'>
                            <textarea
                                id='content'
                                className='w-full h-auto resize-none'
                                placeholder='Leave a thought, or a few thoughts, here'
                                value={content}
                                maxLength={500}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        : null}
                    <div className='flex justify-end'>
                        <button
                            onClick={async (e) => await send(e)}
                            disabled={!content}
                            className='disabled:text-gray-400 disabled:cursor-not-allowed'
                        >
                            <IoIosSend
                                className="text-2xl font-semibold disabled:text-gray-300"
                            />
                        </button>
                    </div>
                </form>
            </div>
            :
            <div>
                <br></br>
            </div>
    );
};

export default NavBar;