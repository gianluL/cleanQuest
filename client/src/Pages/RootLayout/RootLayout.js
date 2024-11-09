import React, { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../Components/common/Header/Header";
import styles from "./RootLayout.module.css";
import Nav from "../../Components/common/Nav/Nav";
import { useCookies } from "react-cookie";

const RootLayoutContext = createContext();

const RootLayout = () => {
  const [cookies ] = useCookies(null);
  const [title, setTitle] = useState("Home");
  const navigate = useNavigate();

  useEffect(()=>{
    if(cookies["AuthToken"] == undefined)
      navigate("/login")
  }, [])
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
