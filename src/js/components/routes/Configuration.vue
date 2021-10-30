<template>
	<div id="configuration" class="has-footer">
		<main @scroll="scroll" :class="{ 'is-scrolled': isScrolled }">
			<h1 class="title is-3">Configuration</h1>

			<form>
				<section v-for="(section, i) in getConfigStructure()" :key="i" class="section">
					<h2 class="title is-5" v-text="section.title"></h2>

					<div
						v-for="key in section.fields"
						:key="key"
						class="field is-horizontal"
						:class="{'is-active': activeField === key }"
						@click="focus(key)"
					>
						<div class="field-label">
							<label :for="key" class="label">
								<h3 v-text="getConfigMetaValue(key, 'label')"></h3>
								<p v-html="getConfigMetaValue(key, 'description')"></p>
							</label>
						</div>
						<div class="field-body">
							<div v-if="getConfigMetaValue(key, 'type') === 'boolean'" class="field">
								<div class="control">
									<input
										:id="key"
										:ref="key"
										type="checkbox"
										class="switch is-rounded"
										:checked="config[key]"
										@change="toggle"
									/>
									<label :for="key"></label>
								</div>
							</div>
							<div v-else-if="getConfigMetaValue(key, 'type') === 'choice' && getConfigMetaValue(key, 'choices').includes(config[key])" class="field">
								<div class="control">
									<div class="select is-fullwidth">
										<select
											:id="key"
											:ref="key"
											:value="config[key]"
											@focus="activeField = key"
											@blur="activeField = ''"
											@change="change"
										>
											<option
												v-for="(value, i) in getConfigMetaValue(key, 'choices')"
												:key="i"
												:value="value"
												v-text="value"
											></option>
										</select>
									</div>
								</div>
							</div>
							<div v-else-if="getConfigMetaValue(key, 'type') === 'file'" class="field has-addons">
								<div class="control is-expanded">
									<input
										:value="'./' + config[key]"
										class="input"
										type="text"
										disabled
									/>
								</div>
								<modal
									:visible="activeField == key"
									@close="activeField = ''"
									close-button="Cancel"
									title="Select file"
								>
									<div class="menu">
										<ul class="menu-list">
											<li v-for="file in files" :key="file">
												<a
													href="#"
													@click.prevent="select(key, file)"
													v-text="'./' + file"
													:class="{ 'is-active': file === config[key] }"
												></a>
											</li>
										</ul>
									</div>
								</modal>
								<div class="control">
									<a
										:id="key"
										:ref="key"
										@click="activeField = key"
										class="button is-primary"
									>
										Select file
									</a>
								</div>
							</div>
							<div v-else-if="getConfigMetaValue(key, 'type') === 'dir'" class="field has-addons">
								<div class="control is-expanded">
									<input
										:value="'./' + config[key]"
										class="input"
										type="text"
										disabled
									/>
								</div>
								<modal
									:visible="activeField == key"
									@close="activeField = ''"
									close-button="Cancel"
									title="Select directory"
								>
									<div class="menu">
										<ul class="menu-list">
											<li v-for="dir in dirs" :key="dir">
												<a
													href="#"
													@click.prevent="select(key, dir)"
													v-text="'./' + dir"
													:class="{ 'is-active': dir === config[key] }"
												></a>
											</li>
										</ul>
									</div>
								</modal>
								<div class="control">
									<a
										:id="key"
										:ref="key"
										@click="activeField = key"
										class="button is-primary"
									>
										Select directory
									</a>
								</div>
							</div>
							<div v-else-if="getConfigMetaValue(key, 'type') === 'code'" class="field">
								<div class="control">
									<prism-editor
										:id="key"
										:ref="key"
										class="prism-editor"
										v-model="config[key]"
										@keyup="saveDisabled = false"
										@focus="activeField = key"
										@blur="activeField = ''"
										:highlight="highlightJson"
										line-numbers
									></prism-editor>
								</div>
							</div>
							<div v-else class="field">
								<div class="control">
									<input
										:type="getConfigMetaValue(key, 'type')"
										class="input"
										:id="key"
										:ref="key"
										:value="config[key]"
										@focus="activeField = key"
										@blur="activeField = ''"
										@input="change"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</form>
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

import dot from 'dot-object';

import get from '../../utils/get.js';
import post from '../../utils/post.js';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Configuration',

	data() {
		return {
			config: {},
			activeField: '',
			saveDisabled: true,
			dirs: [],
			files: []
		};
	},

	computed: {
		...mapGetters(['getFlatConfig', 'getConfigStructure', 'getConfigMetaValue'])
	},

	methods: {
		...mapActions(['setConfig']),

		change(e) {
			this.config[e.target.id] = e.target.value;
			this.saveDisabled = false;
		},

		toggle(e) {
			this.config[e.target.id] = e.target.checked;
			this.saveDisabled = false;
		},

		select(key, value) {
			this.config[key] = value;
			this.activeField = '';
			this.saveDisabled = false;
		},

		focus(key) {
			const ref = this.$refs[key];
			if ('focus' in ref[0]) {
				ref[0].focus();
			}
		},

		async save() {
			this.saveDisabled = true;
			await post('/config/write', this.config);
			this.$emit('change');
		}
	},

	async created() {
		this.dirs = await get('/fs/dirs');
		this.files = await get('/fs/files/json');
		this.config = this.getFlatConfig();
	}
};

</script>
