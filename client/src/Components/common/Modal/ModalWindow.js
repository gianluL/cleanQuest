import React, { Children } from "react";
import styles from './ModalWindow.module.css';
import Overlay from "../Overlay/Overlay";

const ModalWindow = ({title, children, className}) => {
	return (
		<Overlay>
			<div className={styles["modal"]}>
        <h3>{title}</h3>
        <main className={className} >
          {children}
        </main>
      </div>
		</Overlay>
	);
};

export default ModalWindow;
