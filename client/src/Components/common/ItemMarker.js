import React from "react";
import styles from "./ItemMarker.module.css";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

const trashIcon = L.divIcon({
	className: styles.ItemIcon,
	html: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
  <path fill="#b3cf12" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
  `,
	iconSize: [24, 24],
	iconAnchor: [12, 24],
});

const starIcon = L.divIcon({
	className: styles.ItemIcon,
	html: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
  <path fill="#ffff00" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`,
	iconSize: [24, 24],
	iconAnchor: [12, 24],
});

const ItemMarker = ({ marker, onCollect }) => {
	async function collectItem() {
		try {
			// console.log(marker);
			await axios.post("/collect-item", marker);
			// console.log("Item collected");
		} catch (error) {}
	}

	// console.log(marker);
	return (
		<Marker
			position={{ lat: marker.lat, lng: marker.lng }}
			icon={marker.iscollected ? starIcon : trashIcon}
		>
			<Popup>
				<div className={styles.popupContent}>

          <h3>{marker.name}</h3>
          <p>{marker.description}</p>
          <p>Point: {marker.point}</p>
          



					{!marker.iscollected && (
						<button
							onClick={() => {
                collectItem();
								onCollect();
							}}
						>
							Collect
						</button>
					)}
				</div>
			</Popup>
		</Marker>
	);
};

export default ItemMarker;
