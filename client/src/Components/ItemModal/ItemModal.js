import React from "react";
import ModalWindow from "../common/Modal/ModalWindow";
import LabeledInput from "../common/LabeledInput/LabeledInput";
import LabeledTextarea from "../common/LabeledTextarea/LabeledTextarea";
import styles from "./ItemModal.module.css";

const ItemModal = ({
	pos = { lat: 0, lng: 0 },
	address,
	onCancel,
	onReport,
}) => {
	const [item, setItem] = React.useState({
		name: "",
		description: "",
		point: 1,
		lng: pos.lng,
		lat: pos.lat,
		// img: "",
	});

	function handleChange(e) {
		const id = e.target.id;
		const value = e.target.value;
		setItem((prevItem) => {
			return {
				...prevItem,
				[id]: value,
			};
		});
	}

	function onSubmit(e) {
		e.preventDefault();

		onReport(item);
		onCancel();
	}

	return (
		<ModalWindow title={"Report Item"}>
			<form onSubmit={onSubmit} className={styles.ItemModal}>
				<LabeledInput
					id={"name"}
					type={"text"}
					label="Name"
					required
					name={"name"}
					value={item.name}
					onChange={handleChange}
				/>
				<LabeledTextarea
					id={"description"}
					name={"description"}
					label="Description"
					value={item.description}
					onChange={handleChange}
					required
				/>

				<LabeledInput
					id={"point"}
					type={"nuumber"}
					label="Points"
					required
					name={"name"}
					value={item.point}
					onChange={handleChange}
				/>

				{/* <LabeledInput
          id={"img"}
          type={"file"}
          label="Image"
          name={"img"}
          onChange={handleChange}
        /> */}

				<p>
					{" "}
					{address} <br />
					lat: {pos.lat} <br /> lng: {pos.lng}{" "}
				</p>

				<div className="button-container">
					<button className="w-full" type="submit">
						Report Item{" "}
					</button>
					<button className="w-full red-btn" onClick={onCancel}>
						Cancel{" "}
					</button>
				</div>
			</form>
		</ModalWindow>
	);
};

export default ItemModal;
