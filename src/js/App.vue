<template>
	<div id="app" class="columns">
		<header class="column is-narrow">
			<div class="level">
				<div class="level-left">
					<div class="level-item">
						<h1><img src="/images/logo.svg" alt="Sapling" /></h1>
					</div>
					<div class="level-item">
						<h2 v-text="getConfigValue('name')"></h2>
					</div>
				</div>
				<div class="level-right">
					<div class="level-item">
						<p v-if="running" class="tag is-success">Running</p>
						<p v-else class="tag is-dark">Not running</p>
					</div>
					<div class="level-item">
						<a v-if="running" :href="url" v-text="url" target="_blank"></a>
						<p v-else v-text="url"></p>
					</div>
				</div>
			</div>
		</header>
		<div class="column">
			<div class="columns">
				<aside class="column is-narrow">
					<nav class="menu">
						<ul class="menu-list">
							<li><router-link to="/">Dashboard</router-link></li>
						</ul>
						<p class="menu-label">App</p>
						<ul class="menu-list">
							<li><router-link to="/configuration">Configuration</router-link></li>
							<li><router-link to="/hooks">Hooks</router-link></li>
						</ul>
						<p class="menu-label">Data</p>
						<ul class="menu-list">
							<li><router-link to="/data">Browse</router-link></li>
							<li><router-link to="/models">Models</router-link></li>
						</ul>
						<p class="menu-label">Access</p>
						<ul class="menu-list">
							<li><router-link to="/routes">Routes</router-link></li>
							<li><router-link to="/permissions">Permissions</router-link></li>
						</ul>
						<p class="menu-label">UI</p>
						<ul class="menu-list">
							<li><router-link to="/views">Views</router-link></li>
							<li><router-link to="/emails">Emails</router-link></li>
							<li><router-link to="/responses">Responses</router-link></li>
							<li><router-link to="/assets">Assets</router-link></li>
						</ul>
					</nav>
				</aside>
				<main class="column">
					<div class="box">
						<router-view />
					</div>
				</main>
			</div>
		</div>
	</div>
</template>

<script>

import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'App',

	data() {
		return {
			running: false
		};
	},

	computed: {
		...mapGetters(['getConfigValue']),

		url() {
			return `http://localhost:${this.getConfigValue('port')}`;
		}
	},

	created() {
		/* Get config */
		axios.get('/read/config')
			.then((response) => {
				this.initConfig(response.data);
				this.ping();
			});
	},

	mounted() {
		/* Ping every 1s */
		setInterval(this.ping, 1000);
	},

	methods: {
		...mapActions(['initConfig']),

		ping() {
			/* Check if it's running */
			axios.get(`/utils/ping/${this.getConfigValue('port')}`)
				.then(() => {
					this.running = true;
				})
				.catch(() => {
					this.running = false;
				});
		}
	}
};

</script>

<style lang="stylus">

#app
	height 100%
	padding 0.75rem 1.5rem
	margin-top 0
	flex-direction column

	& > .column
		overflow hidden

	header
		img
			height 32px
			margin-right 16px
		
		h2
			font-weight 500
			font-size 17px

	& > .column > .columns
		height 100%
		height calc(100% + 1.5rem)

	aside
		padding-right 2rem
		padding-top 1.5rem
		overflow-y auto
	
	main > .box
		width 100%
		height 100%
		overflow-y auto

</style>
