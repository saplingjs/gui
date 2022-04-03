<template>
	<div id="responses" class="has-footer">
		<main class="no-scroll">
			<h1 class="title is-3">Responses</h1>

			<div class="columns">
				<div class="column is-narrow">
					<nav class="menu mb-4">
						<p class="menu-label">Templates</p>
						<ul class="menu-list">
							<li v-for="template in templateKeys" :key="template">
								<router-link :to="'/responses/' + template" v-text="template"></router-link>
							</li>
						</ul>
					</nav>
				</div>
				<main id="editor" class="column">
					<template v-if="currentTemplate">
						<prism-editor
							:id="currentTemplate"
							:key="currentTemplate"
							:ref="currentTemplate"
							class="prism-editor"
							:value="templates[currentTemplate]"
							@input="updateTemplate"
							@keyup="saveDisabled = false"
							:highlight="highlightHtml"
							:tabSize="4"
							line-numbers
						></prism-editor>
					</template>
					<p class="notification" v-else>Select a response template from the left</p>
				</main>
			</div>
		</main>

		<footer>
			<div class="buttons is-right">
				<button
					class="button is-dark"
					:disabled="saveDisabled"
					@click="save"
				>Save changes</button>
			</div>
		</footer>
	</div>
</template>

<script>

import get from '../../utils/get.js';
import post from '../../utils/post.js';
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
	name: 'Responses',

	data() {
		return {
			templateKeys: [],
			saveDisabled: true
		};
	},

	computed: {
		...mapGetters(['getResponseTemplates', 'getResponseTemplateKeys']),

		...mapState({
			templates: state => state.responses.templates
		}),

		currentTemplate() {
			return this.$route.params.template;
		},
	},

	methods: {
		...mapActions(['initResponseTemplates']),

		updateTemplate(value) {
			this.$store.commit('setResponseTemplate', { key: this.currentTemplate, value });
		},

		async save() {
			this.saveDisabled = true;
			await post('/responses/write', this.getResponseTemplates());
			this.$emit('change');
		}
	},

	async created() {
		this.initResponseTemplates(await get('/responses/read'));
		this.templateKeys = this.getResponseTemplateKeys();
	}
};

</script>

<style lang="stylus" scoped>

main.no-scroll
	display flex
	flex-direction column
	overflow hidden

	& > .columns
		height 100%
		overflow hidden
	
	#editor
		width 100%
		overflow hidden

</style>
