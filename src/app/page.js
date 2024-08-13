'use client'
import { useEffect, useState } from 'react'
import RequestPermission from "@/components/requestPermission";
import { parseLocationData } from '@/lib/location';
import { storeGoogleLocations } from '@/lib/supabase';

export default function Home() {
  const [location, setLocation] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [locality, setLocality] = useState();

  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
        const url = "/api?latitude=" + latitude + "&longitude=" + longitude
        fetch(url)
          .then((response) => response.json())
          .then(async (data) => {
            let location_categories = parseLocationData(data);
            if (location_categories.neighborhood) {
              setNeighborhood(location_categories.neighborhood.long_name);
            }
            setLocality(location_categories.locality.long_name);
            await storeGoogleLocations(data);
          }
          );
      })
    }
  }, []);

  return (
    <main>
      {location ? (
        <div>
          {neighborhood ? (
            <div>
              Neighbourhood: {neighborhood}
              <br />
              Locality: {locality}
            </div>
          ) : (
            <div>
              Locality: {locality}
            </div>
          )}
        </div>
      ) : (
        <RequestPermission />
      )}
    </main>
  );
}