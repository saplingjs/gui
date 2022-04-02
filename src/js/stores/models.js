import dot from 'dot-object';

import formatMeta from '../utils/formatMeta.js';

const state = {
	models: {},

	meta: {
		key: {
			label: 'Field name',
			description: 'Name of the field. No spaces, please',
			type: 'text'
		},
		type: {
			label: 'Type',
			description: 'Type of data stored in this field',
			type: 'choice',
			choices: ['String', 'Number', 'Boolean', 'Date', 'Array', 'File', 'Reference']
		},
		required: {
			label: 'Required',
			description: 'Whether this field must have a value or not',
			type: 'boolean'
		},
		unique: {
			label: 'Unique',
			description: 'Whether the value must be unique or not',
			type: 'boolean'
		},
		default: {
			label: 'Default value',
			description: 'If not defined, this value will be used as a fallback',
			type: 'text'
		},
	}
};

const getters = {
	getModels: (state) => () => {
		return state.models;
	},

	getModelKeys: (state) => () => {
		return Object.keys(state.models);
	},

	getModel: (state) => (model) => {
		return dot.pick(model, state.models) || false;
	},

	getModelFieldKeys: (state) => (model) => {
		return Object.keys(dot.pick(model, state.models) || {});
	},

	getFieldRuleKeys: (state) => (model, field) => {
		return Object.keys(dot.pick(`${model}.${field}`, state.models) || {});
	},

	getFieldRuleValue: (state) => (model, field, rule) => {
		return dot.pick(`${model}.${field}.${rule}`, state.models) || '';
	},

	getModelMetaValue: (state) => (key, value) => {
		let meta = dot.pick(key, state.meta);
		return formatMeta(key, value, meta);
	}
};

const actions = {
	initModels({ commit }, models) {
		commit('setModels', { models });
	},

	editRuleValue({ commit }, { key, value }) {
		if (value === '' || value === null || typeof value === 'undefined') {
			commit('unsetRuleValue', { key });
		} else {
			commit('setRuleValue', { key, value });
		}
	},
};

const mutations = {
	setModels: (state, { models }) => {
		state.models = models;
	},

	setRuleValue: (state, { key, value }) => {
		dot.str(key, value, state.models);
	},

	unsetRuleValue: (state, { key }) => {
		dot.delete(key, state.models);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
