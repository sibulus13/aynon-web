'use client'
import { useEffect, useState } from 'react'

import InitialLoad from "@/components/InitialLoad";
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import Post from '@/components/Post';
import Forum from '@/components/Forum';

import { parseLocationData, smallestRegion } from '@/lib/location';
import { storeGoogleLocations } from '@/lib/supabase';

export default function Home() {
  const [coord, setCoord] = useState();
  const [region, setRegion] = useState();
  const [region_id, setRegion_id] = useState();
  const [page, setPage] = useState('post');
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();

  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        const url = "/api?latitude=" + latitude + "&longitude=" + longitude
        fetch(url)
          .then((response) => response.json())
          .then(async (data) => {
            let location_categories = parseLocationData(data);
            await storeGoogleLocations(data);
            const { region, region_id } = await smallestRegion(data);
            setRegion(region);
            setRegion_id(region_id);
            setCoord(coords);
            setLoading(false);
          }
          );
      })
    }
  }, []);

  return (
    <main className='px-10 h-screen md:px-40 lg:px-60'>
      {!loading ? (
        <div className='h-full'>
          <div className='sticky top-0 bg-white p-2 border-b-2'>
            <Header region={region} />
          </div>
          {
            page === 'forum' ?
              <div className='h-5/6 overflow-y-scroll overflow-hidden'>
                <Forum coord={coord} />
              </div>
              : null
          }
          {
            page === 'post' ?
              <div className='h-5/6'>
                <Post
                  user={null}
                  coord={coord}
                  region_id={region_id}
                  back={() => setPage('forum')}
                  content={content}
                  setContent={setContent}
                />
              </div>
              : null
          }
          <div className='sticky bottom-0 bg-white p-2 border-t-2'>
            <div className='inset-x-1/2 rounded-full backdrop-filter backdrop-blur-3xl p-2'>
              <NavBar setPage={setPage} />
            </div>
          </div>
        </div>
      ) : (
        <InitialLoad />
      )}
    </main>
  );
}