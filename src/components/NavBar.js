import React from 'react';
import { MdForum } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";

const NavBar = ({ setPage, page, send, content, setContent }) => {
    const handleButtonClick = (newPage) => {
        setPage(newPage);
    };

    const isComment = page === 'comment';

    const buttons =
        [
            { name: 'forum', label: 'Forum', icon: <MdForum /> },
            // { name: 'post', label: 'Post', icon: <IoMdAddCircleOutline /> },
            // { name: 'feedback', label: 'Feedback', icon: <MdOutlineFeedback /> },
        ]

    return (
        isComment ?
            <div>
                <form className='flex justify-center items-center'>
                    <textarea
                        placeholder='Comment here'
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div
                        onClick={() => send()}
                        disabled={!content}
                        className='disabled:text-gray-400 disabled:cursor-not-allowed'
                    >
                        Submit
                    </div>
                </form>
            </div>
            :
            <div>
                <div className='flex gap-14 md:gap-40 lg:gap-80 justify-center text-3xl'>
                    {buttons.map((button) => (
                        <button
                            key={button.name}
                            onClick={() => handleButtonClick(button.name)}
                        >
                            {button.icon}
                        </button>
                    ))}
                </div>
            </div>
    );
};

export default NavBar;