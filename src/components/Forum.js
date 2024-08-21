import Entry from './Entry';

const Forum = ({ posts, toComments }) => {
    return (
        <div className='grid gap-4 py-4'>
            {posts.map(post => (
                <Entry post={post} key={post.id} onClick={() => toComments(post)} />
            ))}
        </div>
    );
};

export default Forum;