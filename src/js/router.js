import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './components/routes/Dashboard.vue';

import Assets from './components/routes/Assets.vue';
import Configuration from './components/routes/Configuration.vue';
import Data from './components/routes/Data.vue';
import Emails from './components/routes/Emails.vue';
import Hooks from './components/routes/Hooks.vue';
import Models from './components/routes/Models.vue';
import Permissions from './components/routes/Permissions.vue';
import Responses from './components/routes/Responses.vue';
import Routes from './components/routes/Routes.vue';
import Views from './components/routes/Views.vue';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	linkExactActiveClass: 'is-active',
	linkActiveClass: 'is-active',
	routes: [
		{
			path: '/',
			name: 'Dashboard',
			component: Dashboard,
			meta: {
				title: 'Dashboard',
			},
		},
		{
			path: '/assets',
			name: 'Assets',
			component: Assets,
			meta: {
				title: 'Assets',
			},
		},
		{
			path: '/configuration',
			name: 'Configuration',
			component: Configuration,
			meta: {
				title: 'Configuration',
			},
		},
		{
			path: '/data',
			name: 'Data',
			component: Data,
			meta: {
				title: 'Data',
			},
		},
		{
			path: '/emails',
			name: 'Emails',
			component: Emails,
			meta: {
				title: 'Emails',
			},
		},
		{
			path: '/hooks',
			name: 'Hooks',
			component: Hooks,
			meta: {
				title: 'Hooks',
			},
		},
		{
			path: '/models/:model?/:field?',
			name: 'Models',
			component: Models,
			meta: {
				title: 'Models',
			},
		},
		{
			path: '/permissions',
			name: 'Permissions',
			component: Permissions,
			meta: {
				title: 'Permissions',
			},
		},
		{
			path: '/responses/:template?',
			name: 'Responses',
			component: Responses,
			meta: {
				title: 'Responses',
			},
		},
		{
			path: '/routes',
			name: 'Routes',
			component: Routes,
			meta: {
				title: 'Routes',
			},
		},
		{
			path: '/views',
			name: 'Views',
			component: Views,
			meta: {
				title: 'Views',
			},
		},
	],
});

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} - Sapling`;
	next();
});

export default router;
