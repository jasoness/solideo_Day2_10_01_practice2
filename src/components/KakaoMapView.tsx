import React, { useEffect, useState } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { Location } from '../types';

interface KakaoMapViewProps {
  origin: Location;
  destination: Location;
  waypoints?: Location[];
}

export const KakaoMapView: React.FC<KakaoMapViewProps> = ({
  origin,
  destination,
  waypoints = []
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Calculate center point between origin and destination
  const center = {
    lat: (origin.lat + destination.lat) / 2,
    lng: (origin.lng + destination.lng) / 2
  };

  // Create path for polyline (route visualization)
  const path = [
    { lat: origin.lat, lng: origin.lng },
    ...waypoints.map(wp => ({ lat: wp.lat, lng: wp.lng })),
    { lat: destination.lat, lng: destination.lng }
  ];

  // Check if API key is available
  const API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY || '';

  useEffect(() => {
    if (API_KEY) {
      setIsLoaded(true);
    }
  }, [API_KEY]);

  if (!API_KEY || !isLoaded) {
    return (
      <div className="map-placeholder">
        <h3>🗺️ 카카오 맵 뷰</h3>
        <div className="map-info">
          <p><strong>출발:</strong> {origin.address}</p>
          <p><strong>도착:</strong> {destination.address}</p>
          <p className="map-note">
            💡 실제 지도를 표시하려면 .env 파일에 REACT_APP_KAKAO_MAP_API_KEY를 설정하세요.
          </p>
          <div className="route-visualization">
            <div className="route-point">📍 {origin.address}</div>
            <div className="route-line">↓</div>
            {waypoints.map((wp, idx) => (
              <React.Fragment key={idx}>
                <div className="route-point">📌 {wp.address}</div>
                <div className="route-line">↓</div>
              </React.Fragment>
            ))}
            <div className="route-point">🎯 {destination.address}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kakao-map-container">
      <Map
        center={center}
        style={{ width: '100%', height: '500px', borderRadius: '12px' }}
        level={8}
      >
        {/* Origin Marker */}
        <MapMarker
          position={{ lat: origin.lat, lng: origin.lng }}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            size: { width: 24, height: 35 }
          }}
        >
          <div style={{ padding: '5px', color: '#000', fontSize: '12px', fontWeight: 'bold' }}>
            출발: {origin.address}
          </div>
        </MapMarker>

        {/* Destination Marker */}
        <MapMarker
          position={{ lat: destination.lat, lng: destination.lng }}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
            size: { width: 24, height: 35 }
          }}
        >
          <div style={{ padding: '5px', color: '#000', fontSize: '12px', fontWeight: 'bold' }}>
            도착: {destination.address}
          </div>
        </MapMarker>

        {/* Waypoint Markers */}
        {waypoints.map((wp, idx) => (
          <MapMarker
            key={idx}
            position={{ lat: wp.lat, lng: wp.lng }}
          >
            <div style={{ padding: '5px', color: '#000', fontSize: '12px' }}>
              {idx + 1}. {wp.address}
            </div>
          </MapMarker>
        ))}

        {/* Route Line */}
        <Polyline
          path={path}
          strokeWeight={5}
          strokeColor="#667eea"
          strokeOpacity={0.8}
          strokeStyle="solid"
        />
      </Map>
    </div>
  );
};
