import Vue from 'vue';
import {getWeatherForCity} from './api';

const app = new Vue({
	el: '#app',
	data: {
		temperature: undefined
	},
	computed: {
		dayIsGood() {
			return this.temperature > 25;
		}
	},
	methods: {
		async getWeather() {
			const weather = await getWeatherForCity('Londonn');

			this.temperature = weather.temperature;
		}
	}
});

app.getWeather();