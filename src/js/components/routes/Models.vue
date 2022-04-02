<template>
	<div id="models" class="has-footer">
		<main @scroll="scroll" :class="{ 'is-scrolled': isScrolled }">
			<h1 class="title is-3">Models</h1>
			
			<div class="columns" v-if="models">
				<div class="column is-narrow">
					<nav class="menu mb-4">
						<p class="menu-label">Models</p>
						<ul class="menu-list">
							<li v-for="model in models" :key="model">
								<router-link :to="'/models/' + model" v-text="model"></router-link>
								<div class="dropdown is-right" :class="{ 'is-active': activeDropdown === model }">
									<div class="dropdown-trigger">
										<a @click.prevent="activeDropdown = model" aria-haspopup="true" aria-controls="dropdown-menu"></a>
									</div>
									<div class="dropdown-menu" role="menu">
										<div class="dropdown-content">
											<a class="dropdown-item">
												Rename
											</a>
											<a class="dropdown-item">
												Delete
											</a>
										</div>
									</div>
								</div>
							</li>
						</ul>
						<ul class="menu-list mt-3">
							<li><a href="#">+ Create model</a></li>
						</ul>
					</nav>
				</div>
				<main class="column">
					<div v-if="currentModel">
						<div class="columns" v-if="getModelFieldKeys(currentModel)">
							<div class="column is-narrow">
								<nav class="menu mb-4">
									<p class="menu-label">Fields</p>
									<ul class="menu-list">
										<li v-for="field in getModelFieldKeys(currentModel)" :key="field">
											<router-link :to="`/models/${currentModel}/${field}`" v-text="field"></router-link>
											<div class="dropdown is-right" :class="{ 'is-active': activeDropdown === `${currentModel}.${field}` }">
												<div class="dropdown-trigger">
													<a @click.prevent="activeDropdown = `${currentModel}.${field}`" aria-haspopup="true" aria-controls="dropdown-menu"></a>
												</div>
												<div class="dropdown-menu" role="menu">
													<div class="dropdown-content">
														<a class="dropdown-item">
															Rename
														</a>
														<a class="dropdown-item">
															Delete
														</a>
													</div>
												</div>
											</div>
										</li>
									</ul>
									<ul class="menu-list mt-3">
										<li><a href="#">+ Create field</a></li>
									</ul>
								</nav>
							</div>
							<main class="column">
								<div v-if="currentField">
									<form v-if="getFieldRuleKeys(currentModel, currentField)">
										<div
											class="field is-horizontal"
											:class="{'is-active': activeField === 'key' }"
											@click="focus('key')"
										>
											<div class="field-label">
												<label for="key" class="label">
													<h3 v-text="getModelMetaValue('key', 'label')"></h3>
													<p v-html="getModelMetaValue('key', 'description')"></p>
												</label>
											</div>
											<div class="field-body">
												<div class="field">
													<div class="control">
														<input
															type="text"
															class="input"
															id="key"
															ref="key"
															:value="currentField"
															@focus="activeField = 'key'"
															@blur="activeField = ''"
															@input="change"
														/>
													</div>
												</div>
											</div>
										</div>

										<hr />

										<div
											v-for="rule in getFieldRuleKeys(currentModel, currentField)"
											:key="rule"
											class="field is-horizontal"
											:class="{'is-active': activeField === rule }"
											@click="focus(rule)"
										>
											<div class="field-label">
												<label :for="rule" class="label">
													<h3 v-text="getModelMetaValue(rule, 'label')"></h3>
													<p v-html="getModelMetaValue(rule, 'description')"></p>
												</label>
											</div>
											<div class="field-body">
												<div v-if="getModelMetaValue(rule, 'type') === 'boolean'" class="field">
													<div class="control">
														<input
															:id="rule"
															:ref="rule"
															type="checkbox"
															class="switch is-rounded"
															:checked="getFieldRuleValue(currentModel, currentField, rule)"
															@change="toggle"
														/>
														<label :for="rule"></label>
													</div>
												</div>
												<div v-else-if="getModelMetaValue(rule, 'type') === 'choice' && getModelMetaValue(rule, 'choices').includes(getFieldRuleValue(currentModel, currentField, rule))" class="field">
													<div class="control">
														<div class="select is-fullwidth">
															<select
																:id="rule"
																:ref="rule"
																:value="getFieldRuleValue(currentModel, currentField, rule)"
																@focus="activeField = rule"
																@blur="activeField = ''"
																@change="change"
															>
																<option
																	v-for="(value, i) in getModelMetaValue(rule, 'choices')"
																	:key="i"
																	:value="value"
																	v-text="value"
																></option>
															</select>
														</div>
													</div>
												</div>
												<div v-else class="field">
													<div class="control">
														<input
															:type="getModelMetaValue(rule, 'type')"
															class="input"
															:id="rule"
															:ref="rule"
															:value="getFieldRuleValue(currentModel, currentField, rule)"
															@focus="activeField = rule"
															@blur="activeField = ''"
															@input="change"
														/>
													</div>
												</div>
											</div>
										</div>
									</form>
									<p class="notification is-danger" v-else>No such rule: <code v-text="$route.params.rule"></code></p>
								</div>
								<p class="notification" v-else>Select a rule from the left</p>
							</main>
						</div>
						<p class="notification is-danger" v-else>No such model: <code v-text="$route.params.model"></code></p>
					</div>
					<p class="notification" v-else>Select a model from the left</p>
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
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Models',

	data() {
		return {
			models: false,
			activeField: '',
			activeDropdown: '',
			saveDisabled: true
		};
	},

	computed: {
		...mapGetters(['getModels', 'getModelKeys', 'getModel', 'getModelFieldKeys', 'getFieldRuleKeys', 'getFieldRuleValue', 'getModelMetaValue']),

		currentModel() {
			return this.$route.params.model;
		},

		currentField() {
			return this.$route.params.field;
		}
	},

	methods: {
		...mapActions(['initModels', 'editRuleValue']),

		change(e) {
			this.editRuleValue(`${this.currentModel}.${this.currentField}.${e.target.id}`, e.target.value);
			this.saveDisabled = false;
		},

		toggle(e) {
			this.editRuleValue(`${this.currentModel}.${this.currentField}.${e.target.id}`, e.target.checked);
			this.saveDisabled = false;
		},

		select(key, value) {
			this.editRuleValue(`${this.currentModel}.${this.currentField}.${key}`, value);
			this.activeField = '';
			this.saveDisabled = false;
		},

		focus(key) {
			const ref = this.$refs[key];
			if (ref[0] && 'focus' in ref[0]) {
				ref[0].focus();
			}
		},

		async save() {
			this.saveDisabled = true;
			await post('/models/write', this.getModels());
			this.$emit('change');
		}
	},

	async created() {
		this.initModels(await get('/models/read'));
		this.models = this.getModelKeys();

		document.addEventListener('click', (event) => {
			if (event.target.getAttribute('aria-controls') !== 'dropdown-menu') {
				this.activeDropdown = '';
			}
		});
	}
};

</script>
