import { useLoaderData } from "react-router-dom";

import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
const CountryList = () => {
	const cities = useLoaderData();
	if (cities.length === 0) {
		return <Message message="Click on the map to add new cities" />;
	}

	const countries = cities.reduce((acc, city) => {
		const ans = acc.map((el) => el.country).includes(city.country)
			? acc
			: [...acc, { country: city.country, emojis: city.emoji }];

		return ans;
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.country} />
			))}
		</ul>
	);
};

export default CountryList;
