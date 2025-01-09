/* eslint-disable react/prop-types */

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

const MapBackground = ({ vendor, location }) => {
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
        style={{
          position: "absolute",
          top: -20,
          left: 0,
          height: "86vh",
          width: "100%",
          zIndex: -1,
        }}
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
