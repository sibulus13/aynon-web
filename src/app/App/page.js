// TODO clean up commented code

'use client'
import { useEffect, useState } from 'react'
import InitialLoad from "@/components/InitialLoad";
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import PostForm from '@/components/PostForm';
import Forum from '@/components/Forum';
import Comment from '@/components/Comment';
import FeedbackForm from '@/components/FeedBack';
import { smallestRegion, withinCanada } from '@/lib/location';
import { storeGoogleLocations } from '@/lib/supabase';
import { canadianAnimals } from '@/lib/user';
import { uploadPost, uploadComment, uploadFeedback, getComments, getPosts } from '@/lib/supabase';
import { MdAddCircleOutline } from "react-icons/md";
import { useUser } from '@clerk/clerk-react'

export default function Home() {
  const { user, isLoaded } = useUser()
  const [loading, setLoading] = useState(true);
  const [inCanada, setInCanada] = useState(true);
  const [coord, setCoord] = useState();
  const [region, setRegion] = useState();
  const [region_id, setRegion_id] = useState();
  const [page, setPage] = useState('forum');
  const [userAnimal, setUserAnimal] = useState(canadianAnimals[0]);
  const [content, setContent] = useState('');
  // fetched content
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  // feedback states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchComments = async (post) => {
    const comments = await getComments(post.id, user.id);
    setComments(comments);
  }

  async function toComments(post) {
    setPost(post);
    await fetchComments(post);
    setPage('comment');
  }

  const upLoadContent = async (e) => {
    e.preventDefault();
    if (!content) {
      console.log('Please enter text to post');
      return;
    }

    if (page === 'feedback') {
      await uploadFeedback(name, email, content);
      setName('');
      setEmail('');
      setContent('');
    }

    if (post) {
      await uploadComment(user.id, post.id, content, userAnimal, region_id);
      await fetchComments(post);
      setContent('');
    }
    else {
      await uploadPost(user.id, content, coord, region_id, userAnimal);
      await fetchPosts(coord);
      setContent('');
      setPage('forum');
    }
  }

  const fetchPosts = async (coord) => {
    const posts = await getPosts(coord, user.id);
    setPosts(posts);
  }

  const showPostButton = () => {
    if (page === 'forum') {
      return { visibility: 'visible', disabled: false };
    };
    return { visibility: 'hidden', disabled: true };
  }

  // Fetches and stores user location data
  useEffect(() => {
    let animal = localStorage.getItem('userAnimal');
    if (animal) {
      setUserAnimal(animal);
    }

    if ('geolocation' in navigator && isLoaded) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        const url = "/api?latitude=" + latitude + "&longitude=" + longitude
        fetch(url)
          .then((response) => response.json())
          .then(async (data) => {
            if (!withinCanada(data)) {
              console.log('Not in Canada');
              setInCanada(false);
              return;
            }
            await storeGoogleLocations(data);
            const { region, region_id } = await smallestRegion(data);
            setRegion(region);
            setRegion_id(region_id);
            setCoord(coords);
            await fetchPosts(coords, user?.id);
            setLoading(false);
          }
          );
      })
    }
  }, [isLoaded]);

  return (
    <main className='px-10 md:px-40 lg:px-60 h-screen'>
      {!loading ? (
        inCanada ? (
          <div className='flex flex-col h-full'>
            <div className='sticky top-0 bg-white p-2 border-b-2'>
              <Header
                region={region}
                userAnimal={userAnimal}
                setUserAnimal={setUserAnimal}
                page={page}
                back={() => {
                  setPage('forum')
                  setPost(null)
                }}
                send={async () => await upLoadContent()}
              />
            </div>
            <div className='grow overflow-y-auto'>
              {
                page === 'forum' ?
                  <div className=''>
                    <Forum
                      coord={coord}
                      posts={posts}
                      setPage={setPage}
                      setPost={setPost}
                      setPosts={setPosts}
                      toComments={toComments}
                      user_id={user?.id}
                    />
                  </div>
                  : null
              }
              {
                page === 'post' ?
                  <div className=''>
                    <PostForm
                      content={content}
                      setContent={setContent}
                    />
                  </div>
                  : null
              }
              {
                page === 'comment' ?
                  <div className='h-4/5'>
                    <Comment
                      post={post}
                      userAnimal={userAnimal}
                      back={() => setPage('forum')}
                      region_id={region_id}
                      comments={comments}
                      user_id={user?.id}
                    />
                  </div>
                  : null
              }
              {
                page === 'feedback' ?
                  <div className='h-4/5'>
                    <FeedbackForm
                      send={async () => await upLoadContent()}
                      setName={setName}
                      setEmail={setEmail}
                      setContent={setContent}
                      name={name}
                      email={email}
                      content={content}
                    />
                  </div>
                  : null
              }
            </div>
            <div>
              <MdAddCircleOutline
                className='fixed text-5xl cursor-pointer inset-x-1/2 bottom-20 bg-white rounded-full'
                onClick={() => setPage('post')}
                visibility={showPostButton().visibility}
                disabled={showPostButton().disabled}
              />
            </div>
            <div className='sticky bottom-0 bg-white p-2 border-t-2'>
              <NavBar
                setPage={setPage}
                page={page}
                send={upLoadContent}
                content={content}
                setContent={setContent}
              />
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center h-full'>
            <h1 className='text-3xl'>Sorry, this app only works in Canada, get goosed!</h1>
          </div>
        )) : (
        <InitialLoad />
      )}
    </main>
  );
}