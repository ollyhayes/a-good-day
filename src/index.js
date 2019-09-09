import Vue from 'vue';
import {getWeatherForCity} from './api';

const app = new Vue({
	el: '#app',
	data: {
		temperature: undefined,
		city: 'London'
	},
	computed: {
		dayIsGood() {
			return this.temperature > 25;
		}
	},
	methods: {
		async getWeather() {
			const weather = await getWeatherForCity(this.city);

			this.temperature = weather.temperature;
		}
	}
});

app.getWeather();