import React from "react";
import styles from "./LabeledInput.module.css";

const LabeledInput = ({
	label = "Input",
	id,
	name = undefined,
	type,
	onChange,
	...props
}) => {
	return (
		<div className={styles["labeled-input"]}>
			<label htmlFor={id}>{label}</label>
			<input
				type={type}
				onChange={onChange}
				id={id}
				name={name}
				{...props}
			></input>
		</div>
	);
};

export default LabeledInput;
