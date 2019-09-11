import Vue from 'vue';
import {debounce} from 'lodash';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import {getWeatherForCity} from './api';
import './style.less';

Vue.component('VueSlider', VueSlider);

const app = new Vue({
	el: '#app',
	data: {
		city: 'London',
		temperature: undefined,
		windSpeed: undefined,
		chanceOfRain: undefined,
		goodTemperature: [15, 25],
		goodWindSpeed: [0, 15],
		goodChanceOfRain: [0, 0.3]
	},
	computed: {
		dayIsGood() {
			return this.temperature > this.goodTemperature[0]
				&& this.temperature < this.goodTemperature[1]
				&& this.windSpeed > this.goodWindSpeed[0]
				&& this.windSpeed < this.goodWindSpeed[1]
				&& this.chanceOfRain > this.goodChanceOfRain[0]
				&& this.chanceOfRain < this.goodChanceOfRain[1];
		}
	},
	methods: {
		async getWeather() {
			this.temperature = this.windSpeed = this.chanceOfRain = undefined;
			const weather = await getWeatherForCity(this.city);

			this.temperature = weather.temperature;
			this.windSpeed = weather.windSpeed;
			this.chanceOfRain = weather.chanceOfRain;
		}
	},
	created() {
		this.debouncedGetWeather = debounce(this.getWeather, 500);
	},
	watch: {
		city() {
			this.temperature = this.windSpeed = this.chanceOfRain = undefined;
			this.debouncedGetWeather();
		}
	}
});

app.getWeather();