/* Dependencies */
import Vue from 'vue';
import { PrismEditor } from 'vue-prism-editor';
import App from './App.vue';

import router from './router.js';
import store from './store.js';

/* Components */
import modal from './components/elements/Modal.vue';


/* Code editor */
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core.js';
import 'prismjs/components/prism-clike.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-markup.js';
import 'prismjs/themes/prism-tomorrow.css';

/* Config */
Vue.config.productionTip = false;
Vue.component('modal', modal);
Vue.component('prism-editor', PrismEditor);

Vue.mixin({
	data() {
		return {
			isScrolled: false,
		};
	},

	methods: {
		highlightJson(code) {
			return highlight(code, languages.json);
		},
		highlightJs(code) {
			return highlight(code, languages.js);
		},
		highlightHtml(code) {
			return highlight(code, languages.markup);
		},
		scroll(e) {
			const element = e.target;
			this.isScrolled = element.scrollHeight - element.scrollTop === element.clientHeight;
		},
	},
});

/* Create app */
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
