import {memoize} from 'lodash';

async function requestLatLonForlocation(location) {
	const result = await fetch(`http://geocode.xyz/${location}?json=1`);

	const json = await result.json();

	if (json.error)
		throw new Error('unknown location');

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

async function requestWeatherForlocation(location) {
	const latLon = await requestLatLonForlocation(location);

	return await requestWeatherForLocation(latLon);
}

export const getWeatherForlocation = memoize(requestWeatherForlocation);