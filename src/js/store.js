import Vue from 'vue';
import Vuex from 'vuex';

import config from './stores/config.js';
import models from './stores/models.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		config,
		models
	},
	strict: true
});
