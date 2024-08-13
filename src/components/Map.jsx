import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map({onPositionChange}) {
  const mapRef = useRef(null); // Reference to the map instance
  const [position, setPosition] = useState([
    27.707664546010843, 85.32523816264991,
  ]); // initial position

  useEffect(() => {
    const mapInstance = mapRef.current;
    if (mapInstance) {
      mapInstance.on("moveend", () => {
        const center = mapInstance.getCenter();
        setPosition([center.lat, center.lng]);
        onPositionChange([center.lat, center.lng]);
      });
      console.log(position);
    }
  }, [onPositionChange]);

  return (
    <div>
      <MapContainer
        center={position}
        zoom={12}
        style={{ height: "40vh" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <Marker position={position}>
            <Popup>
              Latitude: {position[0]} <br />
              Longitude: {position[1]} <br />
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
