import React, { useCallback, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { Location } from '../types';

interface GoogleMapViewProps {
  origin: Location;
  destination: Location;
  waypoints?: Location[];
}

const containerStyle = {
  width: '100%',
  height: '500px'
};

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  origin,
  destination,
  waypoints = []
}) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const center = {
    lat: (origin.lat + destination.lat) / 2,
    lng: (origin.lng + destination.lng) / 2
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);

    // Calculate route
    const directionsService = new google.maps.DirectionsService();

    const waypointsFormatted = waypoints.map(wp => ({
      location: new google.maps.LatLng(wp.lat, wp.lng),
      stopover: true
    }));

    directionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        waypoints: waypointsFormatted,
        travelMode: google.maps.TravelMode.TRANSIT,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  }, [origin, destination, waypoints]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Note: In production, use environment variable for API key
  // For demo purposes, this component will show a placeholder message
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

  if (!API_KEY) {
    return (
      <div className="map-placeholder">
        <h3>🗺️ 구글 맵 뷰</h3>
        <div className="map-info">
          <p><strong>출발:</strong> {origin.address}</p>
          <p><strong>도착:</strong> {destination.address}</p>
          <p className="map-note">
            💡 실제 지도를 표시하려면 .env 파일에 REACT_APP_GOOGLE_MAPS_API_KEY를 설정하세요.
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
    <div className="google-map-container">
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {directions && <DirectionsRenderer directions={directions} />}

          {!directions && (
            <>
              <Marker
                position={{ lat: origin.lat, lng: origin.lng }}
                label="출발"
              />
              <Marker
                position={{ lat: destination.lat, lng: destination.lng }}
                label="도착"
              />
              {waypoints.map((wp, idx) => (
                <Marker
                  key={idx}
                  position={{ lat: wp.lat, lng: wp.lng }}
                  label={(idx + 1).toString()}
                />
              ))}
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
