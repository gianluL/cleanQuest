import axios from "axios";
import { useCookies } from "react-cookie";
import {
	createBrowserRouter,
	RouterProvider,
	useNavigate,
} from "react-router-dom";
import {RootLayout} from "./Pages/RootLayout/RootLayout";
import { createContext, useEffect } from "react";
import Page2 from "./Pages/Page2";
import LeaderboardPage from "./Pages/Leaderboard/Leaderboard";
import WeeklyList from "./Pages/Leaderboard/Weekly";

const AppContext = createContext();

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: "",
		children: [
      {
				path: "",
				element: <LeaderboardPage></LeaderboardPage>,
        children: [
          {path: 'weekly', element: <WeeklyList></WeeklyList>},
          {path: 'Monthly', element: <h1>Monthly</h1>},
        ]
			},
			{
				path: "page-2",
				element: <Page2></Page2>,
			},
			{
				path: "page-3",
				element: <h1>Settings</h1>,
			},
		],
	},
]);

function App() {
	const [cookies] = useCookies(null);

	axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
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

// <i class="fa-solid fa-crown"></i>
// <i class="fa-solid fa-people-group"></i>
// 
