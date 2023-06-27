import { useCities } from "../contexts/CitiesContext";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";

const CityList = () => {
	const { cities, isLoading } = useCities();

	if (cities.length === 0 && !isLoading) {
		return <Message message="Click on the map to add new cities" />;
	}
	return isLoading ? (
		<Spinner />
	) : (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem city={city} key={city.id} />
			))}
		</ul>
	);
};

export default CityList;
