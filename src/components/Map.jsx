import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
const Map = () => {
	// Programmatic navigation
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");
	return (
		<div className={styles.mapContainer} onClick={() => navigate("form")}>
			Map
		</div>
	);
};

export default Map;
