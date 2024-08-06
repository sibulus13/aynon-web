'use client'
import { useEffect, useState } from 'react'
import RequestPermission from "@/components/requestPermission";
export default function Home() {
  const [location, setLocation] = useState();
  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      })
    }
  }, []);

  return (
    <main>
      {location ? (
        <div>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </div>
      ) : (
        <RequestPermission />
      )}
    </main>
  );
}