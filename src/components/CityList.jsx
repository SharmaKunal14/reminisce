import { useLoaderData } from "react-router-dom";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
const CityList = () => {
	const cities = useLoaderData();

	if (cities.length === 0) {
		return <Message message="Click on the map to add new cities" />;
	}
	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem city={city} key={city.id} />
			))}
		</ul>
	);
};

export default CityList;
