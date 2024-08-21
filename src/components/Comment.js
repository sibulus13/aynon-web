import React from 'react';
import Entry from './Entry';

const Comment = ({ post, comments }) => {
    return (
        <div>
            <div className='py-4'>
                <Entry post={post} />
            </div>
            <hr className='p-2'></hr>
            <div className='flex flex-col gap-2'>
                {comments.map(comment => (
                    <div key={comment.id}>
                        <Entry post={comment} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comment;