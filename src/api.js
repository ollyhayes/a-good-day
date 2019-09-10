import {memoize} from 'lodash';

async function requestLocationForCity(city) {
	const result = await fetch(`http://geocode.xyz/${city}?json=1`);

	const json = await result.json();

	return {
		lon: json.longt,
		lat: json.latt
	};
}

async function requestWeatherForLocation({lon, lat}) {
	const result = await fetch(`/api/darksky/forecast/access_key/${lon},${lat}`);

	const json = await result.json();

	const weather = json.daily.data[0];

	return {
		temperature: weather.temperatureHigh,
		chanceOfRain: weather.precipProbability,
		windSpeed: weather.windSpeed
	};

}

async function requestWeatherForCity(city) {
	const location = await requestLocationForCity(city);

	return await requestWeatherForLocation(location);
}

export const getWeatherForCity = memoize(requestWeatherForCity);