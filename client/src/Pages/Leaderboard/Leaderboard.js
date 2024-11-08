import React, { useContext, useEffect } from "react";
import { RootLayoutContext } from "../RootLayout/RootLayout";
import { NavLink, Outlet } from "react-router-dom";

const LeaderboardPage = () => {
	const { setTitle } = useContext(RootLayoutContext);
	useEffect(() => {
		setTitle("Leaderboard");
	}, []);

  function isCurrentLocation({ isActive }) {
		return isActive ? "active" : undefined;
	}
	return (
		<div className="page">
			<div className="nav-container">
				<NavLink className={isCurrentLocation} to={'weekly'} >Weekly</NavLink>
				<NavLink className={isCurrentLocation} to={'monthly'} >Monthly</NavLink>
			</div>
      <Outlet></Outlet>
		</div>
	);
};

export default LeaderboardPage;
