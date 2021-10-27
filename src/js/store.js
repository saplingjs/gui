import Vue from 'vue';
import Vuex from 'vuex';

import config from './stores/config.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		config
	},
	strict: true
});
