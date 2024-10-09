import React from 'react';
import { timeSince } from '@/lib/time';
import { useState } from 'react';
import { BiUpvote, BiSolidUpvote, BiDownvote, BiSolidDownvote, BiCommentDetail } from "react-icons/bi";
import { upsertPostVote, upsertCommentVote } from '@/lib/supabase';
const Entry = ({ post, user_id, type = 'post', onClick = () => { } }) => {
    let [vote, setVote] = useState(post.user_vote);
    function updateVote(vote) {
        setVote(vote);
        if (type === 'post') {
            upsertPostVote(user_id, post.id, vote);
        }
        if (type === 'comment') {
            upsertCommentVote(user_id, post.id, vote);
        }
    }
    return (
        <div onClick={() => onClick()}
            className='border-2 rounded-3xl p-2 max-w-4/5 grid gap-2'>
            <div className='flex justify-between'>
                <div className='h-[calc(1.5em*2)] overflow-ellipsis line-clamp-2'>
                    <span className='text-xs'>{post.location_name || post.locations.name}</span>
                    {' '}
                    <span className='text-xs'>{post.animal}</span>
                    <p className='text-xs'>{timeSince(post.created_at)}</p>
                </div>
                <div className=''>
                    <div className='flex gap-1'>
                        {vote === -1 ?
                            <BiSolidDownvote
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateVote(0);
                                }}
                                className='text-2xl cursor-pointer'
                            />
                            :
                            <BiDownvote
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateVote(-1);
                                }}
                                className='text-2xl cursor-pointer'
                            />
                        }
                        {/* {vote} */}
                        {post.votes + vote - post.user_vote}
                        {vote === 1 ?
                            <BiSolidUpvote
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateVote(0);
                                }}
                                className='text-2xl cursor-pointer'
                            />
                            :
                            <BiUpvote
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateVote(1);
                                }}
                                className='text-2xl cursor-pointer'
                            />
                        }
                    </div>
                </div>
            </div>

            <div className="overflow-hidden">
                <p className='break-words'>{post.content}</p>
            </div>
            <div className='flex justify-end'>
                {post.comment_count ?
                    <div className='flex gap-1'>
                        <BiCommentDetail className='text-2xl' />
                        <span className='text-xs'>{post.comment_count}</span>
                    </div>
                    : null
                }
            </div>
        </div>
    );
};

export default Entry;