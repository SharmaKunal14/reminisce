import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

import "./index.css";

import { CitiesProvider } from "./contexts/CitiesContext";
import { FakeAuthProvider } from "./contexts/FakeAuthContext";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import Error from "./pages/Error";
// import ProtectedRoute from "./pages/ProtectedRoute";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Error = lazy(() => import("./pages/Error"));
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));

import PageNav from "./components/PageNav";
import Form from "./components/Form";
import CityList from "./components/CityList";
import App from "./App";
import CountriesList from "./components/CountryList";
import City from "./components/City";
import SpinnerFullPage from "./components/SpinnerFullPage";

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
				element: (
					<ProtectedRoute>
						<AppLayout />
					</ProtectedRoute>
				),
				children: [
					{
						index: true,
						element: <Navigate to="cities" replace />,
					},
					{
						path: "cities",
						element: <CityList />,
					},
					{
						path: "cities/:id",
						element: <City />,
					},
					{
						path: "countries",
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
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<CitiesProvider>
			<FakeAuthProvider>
				<Suspense fallback={<SpinnerFullPage />}>
					<RouterProvider router={appRouter} />
				</Suspense>
			</FakeAuthProvider>
		</CitiesProvider>
	</React.StrictMode>
);
