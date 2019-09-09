export async function getWeatherForCity(city) {
	// const result = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=9753e913ea64baa961f8b3627b9b0cf3');

	// const json = await result.json();

	const json = city == 'Bristol'
		? {
			'main': { 'temp': 26 },
		}
		: {
			'main': { 'temp': 23 },
		};

	await new Promise(resolve => setTimeout(resolve, 1000));

	return {
		temperature: json.main.temp
	};
}