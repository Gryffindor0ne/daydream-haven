/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect, useRef } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}
function Map() {
    const mapRef = useRef<HTMLElement | null>(null);

    const initMap = () => {
        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(37.40048795010311, 126.94674883318096),
            level: 2,
        };

        const map = new window.kakao.maps.Map(container as HTMLElement, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapRef as MutableRefObject<any>).current = map;
        const marker = new kakao.maps.Marker({ position: map.getCenter() });
        marker.setMap(map);
    };

    useEffect(() => {
        window.kakao.maps.load(() => initMap());
    }, [mapRef]);

    return <div id="map" style={{ width: '900px', height: '600px' }}></div>;
}

export default Map;
