import React, { useContext, useEffect } from "react";
import { RootLayoutContext } from "../RootLayout/RootLayout";
import { NavLink, Outlet } from "react-router-dom";
import UserItem from "./UserItem";

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
		<div className="page">
			<h1>Bozen</h1>
			<ul className="weekly">
				<UserItem></UserItem>
				<UserItem></UserItem>
				<UserItem></UserItem>
				<UserItem></UserItem>
			</ul>
		</div>
	);
};

export default LeaderboardPage;
