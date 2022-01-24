import { useEffect, useState } from "react";

const useGeoLocation = (setCoordinates) => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: 41.56150781511613, lng: -8.39725418760858 }
    });

    const onSucess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
        setCoordinates({lat: location.coords.latitude, lng: location.coords.longitude})
    };

    const onError = (error) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: 41.56150781511613,
                lng: -8.39725418760858
            },
            error,
        });
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            });
        }
        navigator.geolocation.getCurrentPosition(onSucess, onError);
    });

    return location;
}

export default useGeoLocation;
