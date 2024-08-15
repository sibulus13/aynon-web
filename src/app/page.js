'use client'
import { useEffect, useState } from 'react'
import RequestPermission from "@/components/requestPermission";
import { parseLocationData, smallestRegion } from '@/lib/location';
import { storeGoogleLocations } from '@/lib/supabase';
import Header from '@/components/Header';
import Post from '@/components/Post';
import Forum from '@/components/Forum';

export default function Home() {
  const [coord, setCoord] = useState();
  const [region, setRegion] = useState();
  const [region_id, setRegion_id] = useState();

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
          }
          );
      })
    }
  }, []);

  return (
    <main>
      {/* Show location, or require permission */}
      {coord ? (
        <div>
          <Header region={region} />
          <Forum coord={coord} />
          <Post user={null} coord={coord}
            region={region} region_id={region_id} />
        </div>
      ) : (
        <RequestPermission />
      )}
    </main>
  );
}