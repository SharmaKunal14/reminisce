import { createContext } from "react";

const CitiesContext = createContext();

const DATA_URL = "http://localhost:4567";
const CitiesProvider = ({ children }) => {
	const fetchCities = async ({ request }) => {
		const res = await fetch(`${DATA_URL}/cities`, {
			signal: request.signal,
		});
		const cities = await res.json();

		return cities;
	};

	return (
		<CitiesContext.Provide value={fetchCities}>
			{children}
		</CitiesContext.Provide>
	);
};

export { CitiesProvider };
