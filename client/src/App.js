import axios from "axios";
import { useCookies } from "react-cookie";
import {
	createBrowserRouter,
	RouterProvider,
	useNavigate,
} from "react-router-dom";
import { RootLayout } from "./Pages/RootLayout/RootLayout";
import { createContext, useEffect } from "react";
import LeaderboardPage from "./Pages/Leaderboard/Leaderboard";
import MapPage from "./Pages/MapPage/MapPage";
import AuthPage from "./Pages/AuthPage/AuthPage";

const AppContext = createContext();

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: "404 PAGE NOT FOUND",
		children: [
			{
				path: "",
				element: <MapPage></MapPage>,
			},
			{
				path: "Leaderboard",
				element: <LeaderboardPage></LeaderboardPage>,
			},


		],
	},

	{ path: "/login", element: <AuthPage></AuthPage>, errorElement: <></> },
]);

function App() {
	const [cookies] = useCookies(null);

	axios.defaults.baseURL = 'http://localhost:3001';
	axios.defaults.headers = {
		Authorization: cookies["AuthToken"],
		"Content-Type": "application/json",
	};

	return (
		<AppContext.Provider value={{}}>
			<RouterProvider router={router}></RouterProvider>
		</AppContext.Provider>
	);
}

export default App;
