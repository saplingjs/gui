/* Dependencies */
import Vue from 'vue';
import App from './App.vue';

import router from './router.js';
import store from './store.js';

/* Config */
Vue.config.productionTip = false;

/* Components */
import modal from './components/elements/Modal.vue';
Vue.component("modal", modal);


/* Code editor */
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
Vue.component("prism-editor", PrismEditor);

import { highlight, languages } from 'prismjs/components/prism-core.js';
import 'prismjs/components/prism-clike.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/themes/prism-tomorrow.css';

Vue.mixin({
	data() {
		return {
			isScrolled: false
		}
	},

	methods: {
		highlightJson(code) {
			return highlight(code, languages.json);
		},
		highlightJs(code) {
			return highlight(code, languages.js);
		},
		scroll(e) {
			const el = e.target;
			this.isScrolled = el.scrollHeight - el.scrollTop === el.clientHeight;
		}
	}
});

/* Create app */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
