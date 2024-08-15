import React, { useState } from 'react';
import { MdForum } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
const NavBar = ({ setPage }) => {
    const handleButtonClick = (newPage) => {
        setPage(newPage);
    };

    const buttons =
        [
            { name: 'forum', label: 'Forum', icon: <MdForum /> },
            { name: 'post', label: 'Post', icon: <IoMdAddCircleOutline /> },
            { name: 'feedback', label: 'Feedback', icon: <MdOutlineFeedback /> },
        ]

    return (
        <div className='flex gap-14 md:gap-40 lg:gap-80 justify-center text-3xl'>
            {buttons.map(button => (
                <button key={button.name} onClick={() => handleButtonClick(button.name)}>{button.icon}</button>
            ))}
        </div>
    );
};

export default NavBar;