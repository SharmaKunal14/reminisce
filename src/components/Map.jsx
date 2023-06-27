import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoloaction";
import Button from "./Button";
import { useURLLocation } from "../hooks/useURLLocation";
const ChangeCenter = ({ position }) => {
	const map = useMap();
	map.setView(position);
	return null;
};
const DetectClick = () => {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
};
const Map = () => {
	// Programmatic navigation
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const {
		isLoading: isPositonLoading,
		position: geoLocation,
		getPosition,
	} = useGeolocation();
	const { cities } = useCities();
	const [mapLat, mapLng] = useURLLocation();
	useEffect(() => {
		if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
	}, [mapLat, mapLng]);
	useEffect(() => {
		if (geoLocation) setMapPosition([geoLocation.lat, geoLocation.lng]);
	}, [geoLocation]);
	return (
		<div className={styles.mapContainer}>
			{!geoLocation && (
				<Button type="position" onClick={getPosition}>
					{isPositonLoading ? "Loading" : "Use your Position"}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => {
					const position = [city.position.lat, city.position.lng];
					return (
						<Marker position={position} key={city.id}>
							<Popup>
								<span>{city.emoji}</span>
								<span>{city.cityName}</span>
							</Popup>
						</Marker>
					);
				})}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
};

export default Map;
