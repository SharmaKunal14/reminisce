// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import Message from "./Message";
import BackButton from "./BackButton";
import { useURLLocation } from "../hooks/useURLLocation";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function Form() {
	const [lat, lng] = useURLLocation();
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [emoji, setEmoji] = useState("");
	const [isLoadingLocation, setIsLoadingLocation] = useState(false);
	const [geoLocationError, setGeoLocationError] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const navigate = useNavigate();
	const { createCity, isLoading } = useCities();
	useEffect(() => {
		if (!lat || !lng) return;
		const getCityData = async () => {
			try {
				setIsLoadingLocation(true);
				setGeoLocationError("");
				const resp = await fetch(
					`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
				);
				const data = await resp.json();
				if (!data.countryCode)
					throw new Error(
						"This doesn't seem to be any continent. Click on something speacial 😉"
					);
				setCityName(data.city || data.locality || "");
				setCountry(data.country);
				setEmoji(convertToEmoji(data.countryCode));
			} catch (err) {
				setGeoLocationError(err.message);
			} finally {
				setIsLoadingLocation(false);
			}
		};
		getCityData();
	}, [lat, lng]);

	if (isLoadingLocation) return <Spinner />;
	if (geoLocationError) return <Message message={geoLocationError} />;
	if (!lat || !lng)
		return <Message message="Start by clicking somewhere on the map" />;
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!cityName || !date) return;
		const newCity = {
			cityName,
			country,
			emoji,
			position: { lat, lng },
			date,
			notes,
		};

		// console.log(newCity);
		await createCity(newCity);
		navigate("/app/cities");
	};
	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handleSubmit}
		>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				{/* <input
					id="date"
					onChange={(e) => setDate(e.target.value)}
					value={date}
				/> */}
				<DatePicker
					id="date"
					onChange={(date) => setDate(date)}
					selected={date}
					format="dd/MM/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">
					Notes about your trip to {cityName}
				</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button onClick={() => {}} type="primary">
					Add
				</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
