/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

function Map() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                if (!mapRef.current) return;

                const options = {
                    center: new window.kakao.maps.LatLng(37.40048795010311, 126.94674883318096),
                    level: 2,
                };

                const map = new window.kakao.maps.Map(mapRef.current, options);
                const marker = new window.kakao.maps.Marker({ position: map.getCenter() });
                marker.setMap(map);
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return <div ref={mapRef} style={{ width: '900px', height: '600px' }}></div>;
}

export default Map;
