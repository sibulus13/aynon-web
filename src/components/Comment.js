import React, { useState, useEffect } from 'react';
import Entry from './Entry';
import { IoMdArrowBack } from 'react-icons/io';
import { uploadComment, getComments } from '@/lib/supabase';

const Comment = ({ post, userAnimal, region_id, back }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        const comments = await getComments(post.id);
        setComments(comments);
    }

    const upLoadComment = async (e) => {
        e.preventDefault();
        if (!comment) {
            console.log('Please enter a comment');
            return;
        }
        const user = null;
        await uploadComment(user, post.id, comment, userAnimal, region_id);
        await fetchComments();
        setComment('');
    }

    return (
        <div className='h-full'>
            <button>
                <IoMdArrowBack
                    onClick={back}
                    className='text-3xl mt-4' />
            </button>
            <div className='py-4'>
                <Entry post={post} />
            </div>

            <hr className='p-2'></hr>
            {comments.map(comment => (
                <div>
                    <Entry post={comment} />
                </div>
            ))}

            <div className=''>
                <form className='flex justify-center items-center'>
                    <textarea
                        placeholder='Comment here'
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        onClick={upLoadComment}
                        disabled={!comment}
                        className='disabled:text-gray-400 disabled:cursor-not-allowed'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Comment;