'use client'
import { useEffect, useState } from 'react'

export default function RequestPermission() {
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
        <div>
            Please allow location access to continue.
        </div>
    );
}