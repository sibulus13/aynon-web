import Entry from './Entry';

const Forum = ({ posts, toComments, user_id }) => {
    return (
        <div className='grid gap-4 p-4'>
            {posts.map(post => (
                <Entry post={post} key={post.id} type={'post'} user_id={user_id} onClick={() => toComments(post)} />
            ))}
            {posts.length === 0 && (
                <div className='flex justify-center text-gray-500'>
                    <p>Its pretty quiet here... start something!</p>
                </div>
            )}
        </div>
    );
};

export default Forum;