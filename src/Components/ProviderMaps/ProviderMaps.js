import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import customMarkerIcon from '../../assets/icons/locationMarker.png';
const ProviderMaps = () => {
    const mapTilerUrl = `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=CW0HvJ1rn0g77UdDE9tW`;
    const customIcon = L.icon({
        iconUrl: customMarkerIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const citiesData = [
        { name: "Dhaka", position: [23.8103, 90.4125], serviceProviders: 50, details: "Details about Dhaka" },
        { name: "Khulna", position: [22.8456, 89.5644], serviceProviders: 30, details: "Details about Khulna" },
        { name: "Sylhet", position: [24.8949, 91.8721], serviceProviders: 25, details: "Details about Sylhet" },
        { name: "Rajshahi", position: [24.3745, 88.6100], serviceProviders: 20, details: "Details about Rajshahi" },
        { name: "Chittagong", position: [22.3569, 91.8367], serviceProviders: 35, details: "Details about Chittagong" },
        { name: "Barisal", position: [22.7010, 90.3535], serviceProviders: 15, details: "Details about Barisal" },
        { name: "Mymensingh", position: [24.7465, 90.4074], serviceProviders: 10, details: "Details about Mymensingh" },
        { name: "Jessore", position: [23.1641, 89.2167], serviceProviders: 18, details: "Details about Jessore" },
    ];

    return (
        <div>
            <MapContainer center={[23.685, 90.3563]} zoom={7} style={{ height: "500px", width: "100%" }}>
                <TileLayer url={mapTilerUrl} />
                {citiesData.map((city, index) => (
                    <Marker key={index} position={city.position} icon={customIcon}>
                        <Tooltip direction="top" offset={[0, -32]} opacity={1}>
                            {city.name} : {city.serviceProviders} providers
                        </Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default ProviderMaps;
