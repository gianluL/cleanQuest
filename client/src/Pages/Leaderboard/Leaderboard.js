import React, { useContext, useEffect } from "react";
import { RootLayoutContext } from "../RootLayout/RootLayout";
import { NavLink, Outlet } from "react-router-dom";
import UserItem from "./UserItem";
import  styles from "./Leaderboard.module.css";
import UserItems from "../../Components/UserItems";

const LeaderboardPage = () => {
	const { setTitle } = useContext(RootLayoutContext);
	const [leaderboard, setLeaderboard] = React.useState([]);

	useEffect(() => {
		setTitle("Leaderboard");
	}, []);

	function isCurrentLocation({ isActive }) {
		return isActive ? "active" : undefined;
	}
	return (
		<div className={styles.page}>
			<h1>Weekly</h1>
			<ul className="weekly">
				<UserItems/>
			</ul>
		</div>
	);
};

export default LeaderboardPage;
