import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './components/Dashboard.vue';

import Assets from './components/Assets.vue';
import Configuration from './components/Configuration.vue';
import Data from './components/Data.vue';
import Emails from './components/Emails.vue';
import Hooks from './components/Hooks.vue';
import Models from './components/Models.vue';
import Permissions from './components/Permissions.vue';
import Responses from './components/Responses.vue';
import Routes from './components/Routes.vue';
import Views from './components/Views.vue';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	linkExactActiveClass: 'is-active',
	routes: [
		{
			path: '/',
			name: 'Dashboard',
			component: Dashboard,
			meta: {
				title: "Dashboard"
			}
		},
		{
			path: "/assets",
			name: "Assets",
			component: Assets,
			meta: {
				title: "Assets"
			}
		},
		{
			path: "/configuration",
			name: "Configuration",
			component: Configuration,
			meta: {
				title: "Configuration"
			}
		},
		{
			path: "/data",
			name: "Data",
			component: Data,
			meta: {
				title: "Data"
			}
		},
		{
			path: "/emails",
			name: "Emails",
			component: Emails,
			meta: {
				title: "Emails"
			}
		},
		{
			path: "/hooks",
			name: "Hooks",
			component: Hooks,
			meta: {
				title: "Hooks"
			}
		},
		{
			path: "/models",
			name: "Models",
			component: Models,
			meta: {
				title: "Models"
			}
		},
		{
			path: "/permissions",
			name: "Permissions",
			component: Permissions,
			meta: {
				title: "Permissions"
			}
		},
		{
			path: "/responses",
			name: "Responses",
			component: Responses,
			meta: {
				title: "Responses"
			}
		},
		{
			path: "/routes",
			name: "Routes",
			component: Routes,
			meta: {
				title: "Routes"
			}
		},
		{
			path: "/views",
			name: "Views",
			component: Views,
			meta: {
				title: "Views"
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} - Sapling`;
	next();
});

export default router;
