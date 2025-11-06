import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../types';

interface LeafletMapViewProps {
  origin: Location;
  destination: Location;
  waypoints?: Location[];
}

// Fix for default marker icons in React-Leaflet
// Using CDN URLs instead of importing
const markerIconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const markerIcon2xUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const markerShadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

// @ts-ignore
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIcon2xUrl,
  shadowUrl: markerShadowUrl,
});

export const LeafletMapView: React.FC<LeafletMapViewProps> = ({
  origin,
  destination,
  waypoints = []
}) => {
  // Calculate center point between origin and destination
  const center: [number, number] = [
    (origin.lat + destination.lat) / 2,
    (origin.lng + destination.lng) / 2
  ];

  // Create path for polyline (route visualization)
  const pathPositions: [number, number][] = [
    [origin.lat, origin.lng],
    ...waypoints.map(wp => [wp.lat, wp.lng] as [number, number]),
    [destination.lat, destination.lng]
  ];

  // Custom icons for different marker types
  const originIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: markerShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const destinationIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: markerShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const waypointIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: markerShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="leaflet-map-container">
      <MapContainer
        center={center}
        zoom={8}
        style={{ height: '500px', width: '100%', borderRadius: '12px' }}
        scrollWheelZoom={true}
      >
        {/* OpenStreetMap Tile Layer - No API key required! */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Origin Marker */}
        <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
          <Popup>
            <strong>출발지</strong>
            <br />
            {origin.address}
          </Popup>
        </Marker>

        {/* Destination Marker */}
        <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
          <Popup>
            <strong>도착지</strong>
            <br />
            {destination.address}
          </Popup>
        </Marker>

        {/* Waypoint Markers */}
        {waypoints.map((wp, idx) => (
          <Marker
            key={idx}
            position={[wp.lat, wp.lng]}
            icon={waypointIcon}
          >
            <Popup>
              <strong>경유지 {idx + 1}</strong>
              <br />
              {wp.address}
            </Popup>
          </Marker>
        ))}

        {/* Route Line */}
        <Polyline
          positions={pathPositions}
          pathOptions={{
            color: '#667eea',
            weight: 4,
            opacity: 0.8
          }}
        />
      </MapContainer>

      <div className="map-info-box">
        <p>🗺️ OpenStreetMap 사용 (API 키 불필요)</p>
        <p>📍 녹색: 출발지 | 🔴 빨강: 도착지 | 🔵 파랑: 경유지</p>
      </div>
    </div>
  );
};
