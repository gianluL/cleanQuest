import React, { useContext, useEffect, useRef, useState } from "react";
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
import ItemModal from "../../Components/ItemModal/ItemModal";
import EventModal from "../../Components/EventModal/EventModal";
import styles from "./MapPage.module.css";
import axios from "axios";
import EventMarker from "../../Components/common/EventMarker";
// import EventModal from "../../Components/EventModal/EventModal";
import { RootLayoutContext }  from "../RootLayout/RootLayout";

const user = L.divIcon({
	className: "custom-marker",
	html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#FF0000" /><circle cx="12" cy="12" r="5" fill="#FFFFFF" /></svg>`,
	iconSize: [24, 24],
	iconAnchor: [12, 24],
});

const MapPage = () => {
	const [position, setPosition] = useState(null);
	const [address, setAddress] = useState(null);
	const [itemMarkers, setItemMarkers] = useState([]);
	const [eventMarkers, setEventMarkers] = useState([]);
	const [reportItemPos, setReportItemPos] = useState(null);
	const [addEventPos, setAddEventPos] = useState(null);
	const [isAddingEvent, setIsAddingEvent] = useState(false);
  

	const { setTitle } = useContext(RootLayoutContext);

	useEffect(() => {
		setTitle("Treasure Map");
	}, []);


  const [filter, setFilter] = useState(0);

	async function reportItem(item) {
		try {
			await axios.post("/report-item", item);
			fetchItems();
		} catch (error) {}
		console.log(item);
	}



	function handleReportItem(lat, lng) {
		setReportItemPos({ lat, lng });
	}

	function handleAddEvent(lat, lng) {
		setAddEventPos({ lat, lng });
	}

	// Handle click event on the map
	const handleMapClick = (e) => {
		const { lat, lng } = e.latlng;
		if (isAddingEvent) {
			handleAddEvent(lat, lng);
		} else {
			handleReportItem(lat, lng);
		}
	};

	// Custom hook to handle map events like click
	function MapClickHandler() {
		useMapEvents({
			click: handleMapClick, // Add marker on click
		});
		return null;
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			try {
				// console.log(position);
				navigator.geolocation.getCurrentPosition(
					(position) => {
						setPosition([position.coords.latitude, position.coords.longitude]);
					},
					(error) => console.log(error)
				);
			} catch (error) {}
		}, 2000);

		return () => {
			clearInterval(intervalId);
			console.log("Interval cleared");
		};
	}, []);

	


	async function fetchEvents() {
		try {
			console.log(axios.defaults.baseURL);
			const res = await axios.get("/events");
      console.log(res.data.events);
			setEventMarkers(res.data.events);
		} catch (error) {

		}
	}

	async function fetchItems() {
		try {
			console.log(axios.defaults.baseURL);
			const res = await axios.get("/items");
			setItemMarkers(res.data.items);
		} catch (error) {}
	}

	useEffect(() => {
		fetchItems();
    fetchEvents();
	}, []);


  function handleFilter(e) {
    setFilter(e.target.id);

    switch(e.target.id){
      case "0":
        fetchItems();
        fetchEvents();
        break;
      case "1":
        fetchEvents();
        // delete item markers
        setItemMarkers([]);

        break;
      case "2":
        fetchItems();

        // delete event markers
        setEventMarkers([]);
        break;
    }
  }

	return (
		<div className={styles.MapPage}>
			<div className={styles.filterContainer}>
				<button onClick={handleFilter} id="0"  className={filter != 0 ? "border-btn" : undefined }>All</button>
				<button onClick={handleFilter} id="1" className={filter != 1 ? "border-btn" : undefined }>Events</button>
				<button onClick={handleFilter} id="2" className={filter != 2 ? "border-btn" : undefined }>Items</button>
			</div>

			<div className={styles.cmdContainer}>
				<button
					className={isAddingEvent == true ? styles.isActive : "border-btn"}
					onClick={() => {
						setIsAddingEvent(!isAddingEvent);
					}}
				>
					{isAddingEvent ? "Add Event" : "Add Item"}
				</button>
			</div>

			{reportItemPos != null && (
				<ItemModal
					onCancel={() => {
						setReportItemPos(null);
					}}
					onReport={reportItem}
					pos={reportItemPos}
				></ItemModal>
			)}

			{addEventPos != null && (
				<EventModal
					onCancel={() => {
						setAddEventPos(null);
					}}
          onAdd={fetchEvents}
					pos={addEventPos}
				></EventModal>
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

					{position && <Marker position={position} icon={user}></Marker>}

					{itemMarkers.map((marker) => (
						<ItemMarker
							key={marker.id}
							onCollect={fetchItems}
							marker={marker}
						></ItemMarker>
					))}
          
          
          {eventMarkers.map((marker) => (
						<EventMarker marker={marker}></EventMarker>
					))}
				</MapContainer>
			)}
		</div>
	);
};

export default MapPage;
