import Vue from 'vue';
import {debounce} from 'lodash';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import {getWeatherForlocation} from './api';
import './style.less';

Vue.component('VueSlider', VueSlider);

const app = new Vue({
	el: '#app',
	data: {
		state: 'loading',
		showConfig: false,
		location: 'London',
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
			this.state = 'loading';
			try {
				const weather = await getWeatherForlocation(this.location);

				this.temperature = weather.temperature;
				this.windSpeed = weather.windSpeed;
				this.chanceOfRain = weather.chanceOfRain;
				this.state = 'ready';
			}
			catch (error) {
				this.state = 'error';
			}
		},
		toggleConfig() {
			this.showConfig = !this.showConfig;
		}

	},
	created() {
		this.debouncedGetWeather = debounce(this.getWeather, 500);
	},
	watch: {
		location() {
			this.state = 'waiting';
			this.debouncedGetWeather();
		}
	}
});

app.getWeather();