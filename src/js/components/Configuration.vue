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
					@click="$refs[key][0].focus()"
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
									:value="getConfigValue(key)"
									class="input"
									type="text"
									disabled
								/>
							</div>
							<div class="control">
								<a
									:id="key"
									:ref="key"
									@focus="activeField = key"
									@blur="activeField = ''"
									class="button is-primary"
								>
									Select file
								</a>
							</div>
						</div>
						<div v-else-if="getConfigMetaValue(key, 'type') === 'dir'" class="field has-addons">
							<div class="control is-expanded">
								<input
									:value="'/' + getConfigValue(key)"
									class="input"
									type="text"
									disabled
								/>
							</div>
							<div class="control">
								<a
									:id="key"
									:ref="key"
									@focus="activeField = key"
									@blur="activeField = ''"
									class="button is-primary"
								>
									Select directory
								</a>
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

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Configuration',

	data() {
		return {
			activeField: ''
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
		}
	}
};

</script>
