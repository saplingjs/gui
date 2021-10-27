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
						<div class="field">
							<p class="control">
								<input
									type="text"
									class="input"
									:id="key"
									:ref="key"
									:value="getConfigValue(key)"
									@focus="activeField = key"
									@blur="activeField = ''"
								/>
							</p>
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
};

</script>
