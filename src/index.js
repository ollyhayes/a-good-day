import Vue from 'vue';
import {debounce} from 'lodash';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import {getWeatherForCity} from './api';

Vue.component('VueSlider', VueSlider);

const app = new Vue({
	el: '#app',
	data: {
		temperature: undefined,
		city: 'London',
		goodTemperature: [25, 27]
	},
	computed: {
		dayIsGood() {
			return this.temperature > this.goodTemperature[0]
				&& this.temperature < this.goodTemperature[1];
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