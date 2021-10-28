<template>
	<div id="configuration">
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
									:checked="getConfigValue(key)"
									@change="toggle"
								/>
								<label :for="key"></label>
							</div>
						</div>
						<div v-else-if="getConfigMetaValue(key, 'type') === 'choice' && getConfigMetaValue(key, 'choices').includes(getConfigValue(key))" class="field">
							<div class="control">
								<div class="select is-fullwidth">
									<select
										:id="key"
										:ref="key"
										:value="getConfigValue(key)"
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
									:value="'./' + getConfigValue(key)"
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
												:class="{ 'is-active': file === getConfigValue(key) }"
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
									:value="'./' + getConfigValue(key)"
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
												:class="{ 'is-active': dir === getConfigValue(key) }"
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
									:value="getConfigValue(key)"
									@input="updateCode(key, $event)"
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
									:value="getConfigValue(key)"
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
	</div>
</template>

<script>

import get from '../../utils/get.js';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Configuration',

	data() {
		return {
			activeField: '',
			dirs: [],
			files: []
		};
	},

	computed: {
		...mapGetters(['getConfigStructure', 'getConfigValue', 'getConfigMetaValue'])
	},

	methods: {
		...mapActions(['editConfigValue']),

		change(e) {
			this.editConfigValue({
				key: e.target.id,
				value: e.target.value
			});
		},

		toggle(e) {
			this.editConfigValue({
				key: e.target.id,
				value: e.target.checked
			});
		},

		select(key, value) {
			this.editConfigValue({ key, value });
			this.activeField = '';
		},

		updateCode(key, value) {
			this.editConfigValue({ key, value });
			this.$forceUpdate();
		},

		focus(key) {
			const ref = this.$refs[key];
			if ('focus' in ref[0]) {
				ref[0].focus();
			}
		}
	},

	async created() {
		this.dirs = await get('/fs/dirs');
		this.files = await get('/fs/files/json');
	}
};

</script>
