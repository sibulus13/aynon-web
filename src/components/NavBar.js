import React from 'react';
import { MdForum } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

const NavBar = ({ setPage, page, send, content, setContent }) => {
    const handleButtonClick = (newPage) => {
        setPage(newPage);
    };

    const showSubmit = page === 'comment' || page === 'post' || page === 'feedback';
    const showTextInput = page === 'comment' || page === 'feedback';
    const textarea = document.getElementById('content');
    if (textarea) {
        textarea.addEventListener("input", function () {
            this.style.height = "auto";  // Reset height to auto
            this.style.height = (this.scrollHeight) + "px";  // Set new height based on scroll height
        });
    }

    const buttons =
        [
            // { name: 'forum', label: 'Forum', icon: <MdForum /> },
            { name: 'post', label: 'Post', icon: <IoMdAddCircleOutline /> },
            // { name: 'feedback', label: 'Feedback', icon: <MdOutlineFeedback /> },
        ]

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
                        :
                        null}
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
            null
        // <div>
        //     <div className='flex gap-14 md:gap-40 lg:gap-80 justify-center text-3xl'>
        //         {buttons.map((button) => (
        //             <button
        //                 key={button.name}
        //                 onClick={() => handleButtonClick(button.name)}
        //             >
        //                 {button.icon}
        //             </button>
        //         ))}
        //     </div>
        // </div>
    );
};

export default NavBar;