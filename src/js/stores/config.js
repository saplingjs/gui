import dot from 'dot-object';

const state = {
	config: {
		name: "untitled",
		port: 3000
	},

	structure: [
		{
			title: "Server",
			fields: [
				"url",
				"port",
				"production"
			]
		},
		{
			title: "Views + Routing",
			fields: [
				"autoRouting",
				"routes",
				"publicDir",
				"viewsDir",
				"extension",
				"render.driver"
			]
		},
		{
			title: "Data",
			fields: [
				"modelsDir",
				"limit",
				"db.driver"
			]
		},
		{
			title: "Hooks",
			fields: [
				"hooks",
				"hooksDir"
			]
		},
		{
			title: "Security",
			fields: [
				"secret",
				"strict",
				"showError",
				"limit",
				"sessionStore.type",
				"sessionStore.options"
			]
		},
		{
			title: "Mail",
			fields: [
				"mail.host",
				"mail.port",
				"mail.secure",
				"mail.auth.user",
				"mail.auth.pass"
			]
		},
		{
			title: "Upload",
			fields: [
				"type",
				"destination"
			]
		}
	],

	meta: {
		publicDir: {
			label: 'Public directory',
			description: 'Directory where publicly available files (images, CSS, etc) are kept',
			type: 'dir'
		},
		modelsDir: {
			label: 'Models directory',
			description: 'Directory where your <a href="https://saplingjs.com/docs/#/models" target="_blank">data models</a> are kept',
			type: 'dir'
		},
		viewsDir: {
			label: 'Views directory',
			description: 'Directory where your <a href="https://saplingjs.com/docs/#/views" target="_blank">views</a> are kept',
			type: 'dir'
		},
		hooksDir: {
			label: 'Hooks directory',
			description: 'Directory where your <a href="https://saplingjs.com/docs/#/hooks" target="_blank">hooks</a> are kept',
			type: 'dir'
		},
		autoRouting: {
			label: 'Automatic routing',
			description: 'Whether <a href="https://saplingjs.com/docs/#/routes?id=automatic-routing" target="_blank">automatic routing</a> is on or not',
			strict: false,
			type: 'boolean'
		},
		routes: {
			label: 'Routes file',
			description: 'JSON file that defines the available routes and their corresponding views',
			type: 'file',
			ext: 'json'
		},
		hooks: {
			label: 'Hooks file',
			description: 'JSON file that defines hooks and their corresponding methods',
			type: 'file',
			ext: 'json'
		},
		permissions: {
			label: 'Permissions file',
			description: 'JSON file that defines minimum user role for each route',
			type: 'file',
			ext: 'json'
		},
		extension: {
			label: 'File extension',
			description: 'Which file extension view files should have (e.g. <code>html</code>)',
			type: 'text'
		},
		secret: {
			label: 'Secret',
			description: 'The string used to encode passwords and other hashes',
			type: 'password'
		},
		showError: {
			label: 'Show errors',
			description: 'Whether details error messages should be shown in the browser',
			strict: false,
			type: 'boolean'
		},
		strict: {
			label: 'Strict mode',
			description: 'Whether <a href="https://saplingjs.com/docs/#/config?id=strict" target="_blank">strict mode</a> is on or not',
			type: 'boolean'
		},
		limit: {
			label: 'Limit',
			description: 'Maximum number of records per page',
			type: 'number'
		},
		production: {
			label: 'Production mode',
			description: 'Whether <a href="https://saplingjs.com/docs/#/production" target="_blank">production mode</a> is on or not. You can also let Sapling decide automatically',
			type: 'choice',
			choices: ['on', 'auto', 'off']
		},
		db: {
			driver: {
				label: 'Database',
				description: 'The database engine you want to use to store the app data',
				type: 'choice',
				choices: ['Memory', 'MongoDB']
			},
		},
		render: {
			driver: {
				label: 'Templating language',
				description: 'The templating engine you want to use to render your views',
				type: 'choice',
				choices: ['HTML', 'Nunjucks', 'Handlebars', 'Pug']
			},
		},
		sessionStore: {
			type: {
				label: 'Session store type',
				description: 'The <a href="https://www.npmjs.com/package/express-session#compatible-session-stores" target="_blank">type of store</a> to be used for storing user sessions',
				type: 'text'
			},
			options: {
				label: 'Session store options',
				description: 'JSON object of store-specific options',
				type: 'code'
			},
		},
		mail: {
			host: {
				label: 'Host',
				description: 'Mail server hostname',
				type: 'text'
			},
			port: {
				label: 'Port',
				description: 'Mail server port',
				type: 'number'
			},
			secure: {
				label: 'Use SSL',
				description: 'Whether accessing the mail server should be done over SSL or not',
				type: 'boolean'
			},
			auth: {
				user: {
					label: 'Username',
					description: 'Mail server authentication username',
					type: 'text'
				},
				pass: {
					label: 'Password',
					description: 'Mail server authentication password',
					type: 'text'
				},
			},
		},
		upload: {
			type: {
				label: 'Location',
				description: 'Where you want to store uploaded files',
				type: 'choice',
				choices: ['Local']
			},
			destination: {
				label: 'Directory',
				description: 'The directory that will contain the uploaded files',
				type: 'dir'
			},
		},
		port: {
			label: 'Port',
			description: 'The port the app should run on',
			type: 'number'
		},
		url: {
			label: 'Hostname',
			description: 'The hostname, and protocol, of the app (i.e. <code>http://localhost</code>)',
			type: 'text'
		}
	}
};

function capitalize(s) {
	return s && s[0].toUpperCase() + s.slice(1);
}

const getters = {
	getConfig: (state) => () => {
		return state.config;
	},

	getFlatConfig: (state) => () => {
		return dot.dot(state.config);
	},

	getConfigValue: (state) => (key) => {
		return dot.pick(key, state.config);
	},

	getConfigStructure: (state) => () => {
		return state.structure;
	},

	getConfigMetaValue: (state) => (key, value) => {
		let meta = dot.pick(key, state.meta);
		meta = meta ? meta : { label: capitalize(key).replaceAll('.', ' ') };
		return meta[value] ? meta[value] : '';
	}
};

const actions = {
	editConfigValue({ commit }, { key, value }) {
		if (value === '' || value === null || value === undefined) {
			commit('unsetConfigValue', { key });
		} else {
			commit('setConfigValue', { key, value });
		}
	},

	initConfig({ commit }, config) {
		commit('setConfig', { config });
	}
};

const mutations = {
	setConfig: (state, { config }) => {
		state.config = config;
	},

	setConfigValue: (state, { key, value }) => {
		dot.str(key, value, state.config);
	},

	unsetConfigValue: (state, { key }) => {
		dot.delete(key, state.config);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
