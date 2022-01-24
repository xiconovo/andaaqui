import { useEffect, useState } from "react";

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        lat: 0,
        lng: 0
    });

    const onSucess = (location) => {
        console.log("got location",location)
        setLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    };

    const onError = (error) => {
        console.log("rip location",error)
        setLocation({
            lat: 41.56150781511613,
            lng: -8.39725418760858
        });
    }

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            });
        } else {
            navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
                if (result.state === 'granted') {
                    navigator.geolocation.getCurrentPosition(onSucess, onError);
                } else {
                    console.log("no location permissions")
                    setLocation({
                        lat: 41.56150781511613,
                        lng: -8.39725418760858
                    });
                }
            });
        }
    }, []);

    return location;
}

export default useGeoLocation;
