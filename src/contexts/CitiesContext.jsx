import { useCallback, useReducer } from "react";
import { createContext, useContext, useEffect } from "react";

const CitiesContext = createContext();

const DATA_URL = "http://localhost:4567";
const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};
const reducer = (state, action) => {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };
		case "cities/loaded":
			return { ...state, isLoading: false, cities: action.payload };
		case "city/created":
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
				cities: [...state.cities, action.payload],
			};
		case "city/loaded":
			return { ...state, isLoading: false, currentCity: action.payload };
		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(
					(city) => city.id !== action.payload
				),
			};
		case "rejected":
			return { ...state, isLoading: false, error: action.payload };
		default:
			throw new Error("Unknown action type");
	}
};
const CitiesProvider = ({ children }) => {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	);
	useEffect(() => {
		const fetchCities = async () => {
			dispatch({ type: "loading" });
			try {
				const res = await fetch(`${DATA_URL}/cities`);
				const cities = await res.json();
				dispatch({ type: "cities/loaded", payload: cities });
			} catch (err) {
				dispatch({
					type: "rejected",
					payload:
						"There was an error while fetching the cities from the API",
				});
			}
		};
		fetchCities();
	}, []);
	const getCity = useCallback(async (id) => {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${DATA_URL}/cities/${id}`);
			const city = await res.json();
			dispatch({ type: "city/loaded", payload: city });
		} catch (err) {
			dispatch({
				type: "rejected",
				payload:
					"There was an error while fetching the city from the API",
			});
		}
	}, []);
	const createCity = async (newCity) => {
		dispatch({ type: "loading" });
		try {
			const resp = await fetch(`${DATA_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await resp.json();
			dispatch({ type: "city/created", payload: data });
		} catch (err) {
			dispatch({
				type: "rejected",
				payload:
					"There was an error while creating the city from the API",
			});
		}
	};
	const deleteCity = async (id) => {
		dispatch({ type: "loading" });
		try {
			await fetch(`${DATA_URL}/cities/${id}`, {
				method: "DELETE",
			});
			dispatch({ type: "city/deleted", payload: id });
		} catch (err) {
			dispatch({
				type: "rejected",
				payload:
					"There was an error while deleting the city from the API",
			});
		}
	};
	return (
		<CitiesContext.Provider
			value={{
				cities,
				currentCity,
				getCity,
				isLoading,
				createCity,
				deleteCity,
				error,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
};

const useCities = () => {
	const context = useContext(CitiesContext);
	if (!context)
		throw new Error("CitiesContext is not scoped in the called Component");
	return context;
};
export { CitiesProvider, useCities };
