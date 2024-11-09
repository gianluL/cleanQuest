import React, { useEffect, useRef, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import ItemMarker from "../../Components/common/ItemMarker";
import Overlay from "../../Components/common/Overlay/Overlay";
import ItemModal from "../../Components/ItemModal/ItemModal";
import styles from "./MapPage.module.css";
import axios from "axios";

const user = L.divIcon({
	className: "custom-marker",
	html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#FF0000" /><circle cx="12" cy="12" r="5" fill="#FFFFFF" /></svg>`,
	iconSize: [24, 24],
	iconAnchor: [12, 24],
});

const MapPage = () => {
	const [position, setPosition] = useState(null);
  const [address, setAddress] = useState(null);
	const [markers, setMarkers] = useState([]);
	const [createMarkerPos, setCreateMarkerPos] = useState(null);

  console.log(address);

  const fetchAddress = async (lat, lng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();
    setAddress(data.display_name || "Address not found");
  };

	async function reportItem(item) {
		try {
			await axios.post("/report-item", item);
			// console.log("Item reported");
      fetchItems();
		} catch (error) {}
		console.log(item);
	}

	// Handle click event on the map
	const handleMapClick = (e) => {
		const { lat, lng } = e.latlng;
    fetchAddress(lat, lng);
		setCreateMarkerPos({ lat, lng });
	};

	// Custom hook to handle map events like click
	function MapClickHandler() {
		useMapEvents({
			click: handleMapClick, // Add marker on click
		});
		return null;
	}

	useEffect(() => {
		setInterval(() => {
			// console.log(position)
			try {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						setPosition([position.coords.latitude, position.coords.longitude]);
					},
					(error) => console.log(error)
				);
			} catch (error) {}
		}, 2000);
	}, []);

	async function fetchItems() {
		try {
			console.log(axios.defaults.baseURL);
			const res = await axios.get("/items");
			setMarkers(res.data.items);
		} catch (error) {
			// console.error(error.response.data.error);
		}
	}

	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<div className={styles.MapPage}>
			{createMarkerPos != null && (
				<ItemModal
					onCancel={() => {
						setCreateMarkerPos(null);
					}}
					onReport={reportItem}
					pos={createMarkerPos}
				></ItemModal>
			)}

			{position && (
				<MapContainer
					className={styles.map}
					center={position}
					zoom={13}
					scrollWheelZoom={true}
					style={{ height: "100%", width: "100%" }}
				>
					<MapClickHandler />
					<TileLayer
						url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
  OpenStreetMap</a> contributors'
					/>

					{position && (
						<Marker position={position} icon={user}>
							<Popup>You are here</Popup>
						</Marker>
					)}

					{markers.map((marker) => (
						<ItemMarker key={marker.id} onCollect={fetchItems}  marker={marker}></ItemMarker>
					))}
				</MapContainer>
			)}
		</div>
	);
};

export default MapPage;
