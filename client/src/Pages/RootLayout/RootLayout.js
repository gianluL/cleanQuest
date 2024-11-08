import React, { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Components/common/Header/Header";
import styles from "./RootLayout.module.css";
import Nav from "../../Components/common/Nav/Nav";
import { useCookies } from "react-cookie";

const RootLayoutContext = createContext();

const RootLayout = () => {
	const [title, setTitle] = useState();
	const navigate = useNavigate();
	const [cookies] = useCookies(null);
	useEffect(() => {}, []);
	return (
		<RootLayoutContext.Provider value={{ title, setTitle }}>
			<div className={styles["root-layout"]}>
				<Header></Header>
				<div className={styles["content"]}>
					<Outlet></Outlet>
				</div>
				<Nav></Nav>
			</div>
		</RootLayoutContext.Provider>
	);
};

export {RootLayout, RootLayoutContext};
