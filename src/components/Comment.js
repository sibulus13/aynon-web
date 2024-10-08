import React from 'react';
import Entry from './Entry';

const Comment = ({ post, comments, user_id }) => {
    return (
        <div>
            <div className='p-4'>
                <Entry post={post} />
            </div>
            <hr></hr>
            <div className='flex flex-col gap-2 p-4'>
                {comments.map(comment => (
                    <div key={comment.id}>
                        <Entry post={comment} type={'comment'} user_id={user_id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comment;