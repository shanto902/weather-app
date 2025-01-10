/* eslint-disable react/prop-types */

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import styles from "../styles/mapBackground.module.scss";
const MapBackground = ({ vendor, location, isDay }) => {
  // Define a default position (e.g., a central location)
  const defaultPosition = { lat: 23.8103, lng: 90.4125 }; // Dhaka, Bangladesh
  const position = location
    ? { lat: location.lat, lng: location.lon }
    : defaultPosition;

  const apiKey = import.meta.env.VITE_GOOGLE_API;
  const mapId = import.meta.env.VITE_GOOGLE_MAP_ID;

  return (
    <APIProvider apiKey={apiKey}>
      <div
        className={styles.mapContainer}
        style={{ filter: !isDay ? "grayscale(100%) invert(100%)" : "" }}
      >
        <Map
          cameraControl={false}
          disableDefaultUI={true}
          gestureHandling="none"
          draggable={false}
          zoomControl={false}
          clickableIcons={false}
          scrollwheel={false}
          zoom={12}
          center={position}
          mapId={mapId}
        >
          {location && (
            <AdvancedMarker position={position}>
              <Pin background={vendor?.color} borderColor={"black"}></Pin>
            </AdvancedMarker>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapBackground;
