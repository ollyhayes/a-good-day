import Vue from 'vue';
import {debounce} from 'lodash';
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
			this.temperature = undefined;
			const weather = await getWeatherForCity(this.city);

			this.temperature = weather.temperature;
		}
	},
	created() {
		this.debouncedGetWeather = debounce(this.getWeather, 500);
	},
	watch: {
		city() {
			this.temperature = undefined;
			this.debouncedGetWeather();
		}
	}
});

app.getWeather();