import React from "react";
import ModalWindow from "../common/Modal/ModalWindow";
import LabeledInput from "../common/LabeledInput/LabeledInput";
import LabeledTextarea from "../common/LabeledTextarea/LabeledTextarea";
import styles from "./EventModal.module.css";
import axios from "axios";

const EventModal = ({
	pos = { lat: 0, lng: 0 },
	onCancel,
	onAdd,
}) => {
	const [event, setEvent] = React.useState({
		title: "",
		description: "",
		participantPoint: 3,
    date: '',
		lng: pos.lng,
		lat: pos.lat,
	});

	function handleChange(e) {
		const id = e.target.id;
		const value = e.target.value;
		setEvent((prevEvent) => {
			return {
				...prevEvent,
				[id]: value,
			};
		});
	}

	async function addEvent(event) {
		try { 
      console.log(event);
			await axios.post("/add-event", event);
			onAdd();
		} catch (error) {
			console.log(error);
		}
	}
  

	async function onSubmit(e) {
		e.preventDefault();

    addEvent(event);
		onCancel();
	}

	return (
		<ModalWindow title={"Add Event"}>
			<form onSubmit={onSubmit} className={styles.EventModal}>
				<LabeledInput
					label="Title"
					id={"title"}
					name={"title"}
					type={"text"}
					required
					value={event.title}
					onChange={handleChange}
				/>
				<LabeledTextarea
					id={"description"}
					name={"description"}
					label="Description"
					value={event.description}
					onChange={handleChange}
					required
				/>
        <LabeledInput
          id={"date"}
          type={"date"}
          label="Date"
          required
          name={"date"}
          onChange={handleChange}
          />

				<LabeledInput
					id={"point"}
					type={"nuumber"}
					label="Points"
					required
					name={"name"}
					onChange={handleChange}
				/>



				<p>
					
					lat: {pos.lat} <br /> lng: {pos.lng}{" "}
				</p>

				<div className="button-container">
					<button className="w-full" type="submit">
						Add Event
					</button>
					<button className="w-full red-btn" onClick={onCancel}>
						Cancel{" "}
					</button>
				</div>
			</form>
		</ModalWindow>
	);
};

export default EventModal;
