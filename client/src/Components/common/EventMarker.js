import React, { useEffect, useState } from "react";
import styles from "./ItemMarker.module.css";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

const partyIcon = L.divIcon({
	className: styles.ItemIcon,
	html: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
  <path fill="#FFA500"  d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z"/></svg>`,
	iconSize: [24, 24],
	iconAnchor: [12, 24],
});

const EventMarker = ({ marker, onCollect }) => {
	const [markerState, setMarkerState] = useState(marker);

	async function collectItem() {
		try {
			// console.log(marker);
			await axios.post("/collect-item", marker);
			// console.log("Item collected");
		} catch (error) {}
	}

	useEffect(() => {
		setMarkerState({ ...marker });
	}, [marker]);

	// console.log(marker);
	return (
		<Marker position={{ lat: marker.lat, lng: marker.lng }} icon={partyIcon}>
			<Popup>
				<div className={styles.popupContent}>
					<h3>{markerState.title}</h3>
					<p>{markerState.description}</p>
					<p>Points: {markerState.participantpoint}</p>
					<p>date: {markerState.date}</p>
					{markerState.user != localStorage.getItem("uid") && <button>Join</button>}
				</div>
			</Popup>
		</Marker>
	);
};

export default EventMarker;
