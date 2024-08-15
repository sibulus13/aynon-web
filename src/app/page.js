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
  const [page, setPage] = useState('forum');
  const [loading, setLoading] = useState(true);

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
    <main>
      {!loading ? (
        <div>
          <Header region={region} />
          {
            page === 'forum' ?
              <Forum coord={coord} />
              : null
          }
          {
            page === 'post' ?
              <div>
                <Post user={null} coord={coord} region_id={region_id} />
              </div>
              : null
          }
          <div className='absolute bottom-10 inset-x-1/2'>
            <NavBar setPage={setPage} />
          </div>
        </div>
      ) : (
        <InitialLoad />
      )}
    </main>
  );
}