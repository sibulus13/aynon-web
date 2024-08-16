import React, { useState, useEffect } from 'react';
import Entry from './Entry';

const Comment = ({ post }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // TODO fetch comments based on post
    }, []);

    return (
        <div>
            <button>back</button>
            <div className='py-4'>
                <Entry post={post} />
            </div>
            {comments.map(comment => (
                <div key={comment.id}>
                    <h3>{comment.name}</h3>
                    <p>{comment.body}</p>
                </div>
            ))}
            <div >
                <form className='flex justify-center items-center'>
                    <textarea placeholder='Comment here' />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Comment;