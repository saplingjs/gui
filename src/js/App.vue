<template>
	<div id="app" class="columns">
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
</template>

<script>

export default {
	name: 'App'
};

</script>

<style lang="stylus">

#app
	height 100%
	padding 0.75rem 1.5rem
	margin-top 0

	& > aside
		padding-right 2rem
		padding-top 1.5rem
		overflow-y auto
	
	& > main > .box
		width 100%
		height 100%
		overflow-y auto

</style>
