import dot from 'dot-object';

const state = {
	templates: {},
};

const getters = {
	getResponseTemplates: state => () => state.templates,

	getResponseTemplateKeys: state => () => Object.keys(state.templates),
};

const actions = {
	initResponseTemplates({ commit }, templates) {
		commit('setResponseTemplates', { templates });
	},

	editResponseTemplate({ commit }, { key, value }) {
		commit('setResponseTemplate', { key, value });
	},
};

const mutations = {
	setResponseTemplates(state, { templates }) {
		state.templates = templates;
	},

	setResponseTemplate(state, { key, value }) {
		dot.str(key, value, state.templates);
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
