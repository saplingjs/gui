import Vue from 'vue';
import Vuex from 'vuex';

import config from './stores/config.js';
import models from './stores/models.js';
import responses from './stores/responses.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		config,
		models,
		responses,
	},
	strict: true,
});
