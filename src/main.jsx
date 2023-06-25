import React from "react";
import ReactDOM from "react-dom/client";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

import "./index.css";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Error from "./pages/Error";
import PageNav from "./components/PageNav";
import Form from "./components/Form";
import CityList from "./components/CityList";
import App from "./App";
import CountriesList from "./components/CountryList";
import City from "./components/City";
import { CitiesProvider } from "./contexts/CitiesContext";
const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: (
					<Homepage>
						<PageNav />
					</Homepage>
				),
			},
			{
				path: "/product",
				element: (
					<Product>
						<PageNav />
					</Product>
				),
			},

			{
				path: "/pricing",
				element: (
					<Pricing>
						<PageNav />
					</Pricing>
				),
			},
			{
				path: "/login",
				element: (
					<Login>
						<PageNav />
					</Login>
				),
			},
			{
				path: "app",
				element: <AppLayout />,
				children: [
					{
						index: true,
						loader: fetchCities,
						element: <Navigate to="cities" replace />,
					},
					{
						path: "cities",
						loader: fetchCities,
						element: <CityList />,
					},
					{
						path: "cities/:id",
						loader: fetchCities,
						element: <City />,
					},
					{
						path: "countries",
						loader: fetchCities,
						element: <CountriesList />,
					},
					{
						path: "form",
						element: <Form />,
					},
				],
			},
		],
	},
]);
// useEffect(() => {
// 	const fetchCities = async () => {
// 		try {
// 			setIsLoading(true);
// 			const resp = await fetch(`${DATA_URL}/cities`);
// 			const data = await resp.json();
// 			setCities(data);
// 		} catch (err) {
// 			console.error(err);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};
// 	fetchCities();
// }, []);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<CitiesProvider>
			<RouterProvider router={appRouter} />
		</CitiesProvider>
	</React.StrictMode>
);
