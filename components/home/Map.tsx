"use client";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export default function Map() {
  return (
    <MapContainer
      center={[17.1248771, 96.0088794]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[17.1248771, 96.0088794]}>
        <Popup>This is a popup</Popup>
      </Marker>
    </MapContainer>
  );
}
