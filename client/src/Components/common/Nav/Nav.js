import React from "react";
import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
	function isCurrentLocation({ isActive }) {
		return isActive ? styles["active"] : undefined;
	}

	return (
		<nav className={styles["app-nav"]}>
			<NavLink to={"/"} className={isCurrentLocation}>
				<i class="fa-solid fa-map"></i>
			</NavLink>
			<NavLink to={"/page-2"} className={isCurrentLocation}>
				<i className="fa-solid fa-crown"></i>
			</NavLink>
			<NavLink to={"/page-3"} className={isCurrentLocation}>
				<i className="fa-solid fa-people-group"></i>
			</NavLink>
		</nav>
	);
};

export default Nav;
