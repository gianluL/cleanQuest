import React from "react";
import styles from "./ErrorContainer.module.css";

const ErrorContainer = ({ title = "ERROR", errors, className, onClose }) => {
	return (
		<div className={`${styles["error-container"]} ${className}`}>
			<header>
				<h6 className={styles["title"]} >{title}</h6>
				<button className="red-btn square-btn" onClick={onClose}>
					<i className="fa-solid fa-x"></i>
				</button>
			</header>
			<ul>
        {
          Array.from(errors).map((error)=>(
            <li key={error}>{error}</li>
          ))
        }
			</ul>
		</div>
	);
};

export default ErrorContainer;
