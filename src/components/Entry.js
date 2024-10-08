import React from 'react';
import { timeSince } from '@/lib/time';
import { random_canadian_animal } from '@/lib/user';

const Entry = ({ post, onClick = () => { } }) => {
    return (
        <div onClick={() => onClick()}
            className='border-2 rounded-3xl p-2 max-w-4/5 grid gap-2'>
            <div className='h-[calc(1.5em*2)] overflow-ellipsis line-clamp-2'>
                <span className='text-xs'>{post.location_name || post.locations.name }</span>
                {' '}
                <span className='text-xs'>{random_canadian_animal(post.animal)}</span>
                <p className='text-xs'>{timeSince(post.created_at)}</p>
            </div>
            <div className="overflow-hidden">
                <p className='break-all'>{post.content}</p>
            </div>
        </div>
    );
};

export default Entry;