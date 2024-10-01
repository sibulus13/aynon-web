'use client'
import { useEffect, useState } from 'react'
import InitialLoad from "@/components/InitialLoad";
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import PostForm from '@/components/PostForm';
import Forum from '@/components/Forum';
import Comment from '@/components/Comment';
import FeedbackForm from '@/components/FeedBack';
import { smallestRegion } from '@/lib/location';
import { storeGoogleLocations } from '@/lib/supabase';
import { canadianAnimals } from '@/lib/user';
import { uploadPost, uploadComment, getComments, getPosts } from '@/lib/supabase';

import { MdAddCircleOutline } from "react-icons/md";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [coord, setCoord] = useState();
  const [region, setRegion] = useState();
  const [region_id, setRegion_id] = useState();
  const [page, setPage] = useState('forum');

  const [user, setUser] = useState(null);
  const [userAnimal, setUserAnimal] = useState(canadianAnimals[0]);

  const [content, setContent] = useState('');
  // fetched content
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchComments = async (post) => {
    const comments = await getComments(post.id);
    setComments(comments);
  }

  async function toComments(post) {
    setPost(post);
    await fetchComments(post);
    setPage('comment');
  }

  const upLoadContent = async () => {
    if (!content) {
      console.log('Please enter text to post');
      return;
    }

    if (post) {
      await uploadComment(user, post.id, content, userAnimal, region_id);
      await fetchComments(post);
      setContent('');
    }
    else {
      await uploadPost(user, content, coord, region_id, userAnimal);
      await fetchPosts(coord);
      setContent('');
      setPage('forum');
    }
  }

  const fetchPosts = async (coord) => {
    const posts = await getPosts(coord);
    setPosts(posts);
  }

  useEffect(() => {
    let animal = localStorage.getItem('userAnimal');
    if (animal) {
      setUserAnimal(animal);
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        const url = "/api?latitude=" + latitude + "&longitude=" + longitude
        fetch(url)
          .then((response) => response.json())
          .then(async (data) => {
            await storeGoogleLocations(data);
            const { region, region_id } = await smallestRegion(data);
            setRegion(region);
            setRegion_id(region_id);
            setCoord(coords);
            await fetchPosts(coords);
            setLoading(false);
          }
          );
      })
    }
  }, []);

  return (
    <main className='px-10 md:px-40 lg:px-60 h-screen'>
      {!loading ? (
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
                  />
                </div>
                : null
            }
            {
              page === 'feedback' ?
                <div className='h-4/5'>
                  <FeedbackForm></FeedbackForm>
                </div>
                : null
            }
          </div>
        </div>
      ) : (
        <InitialLoad />
      )}
    </main>
  );
}