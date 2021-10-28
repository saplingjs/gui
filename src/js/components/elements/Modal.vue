<template>
	<div class="modal" :class="{'is-active': visible}">
		<div class="modal-dialog box">
			<header>
				<slot name="header">
					<h1 class="title is-4" v-html="title"></h1>
				</slot>
			</header>
			<main>
				<slot>
					<p v-html="text"></p>
				</slot>
			</main>
			<footer>
				<slot name="footer">
					<div class="buttons is-right">
						<a href="#" class="button is-primary" @click.prevent="hideModal()" v-text="closeButton"></a>
					</div>
				</slot>
			</footer>
		</div>

		<div class="modal-blanket" :style="blanketStyle" @click.prevent="hideModal()"></div>
	</div>
</template>

<script>

export default {
	name: "Modal",

	props: {
		name: {
			type: String
		},
		title: {
			type: String
		},
		text: {
			type: String
		},
		visible: {
			type: Boolean,
			default: false
		},
		closeButton: {
			type: String,
			default: 'OK'
		}
	},

	computed: {
		/* Calculate scale factor */
		blanketStyle() {
			/* Default to zero (if the modal is not activated) */
			let scaleFactor = 0;

			/* If modal is active, calculate the factor based on the viewport size */
			if(this.visible)
				scaleFactor = (window.innerHeight + window.innerWidth) / window.innerWidth;

			return `transform: skew(-45deg) scaleX(${scaleFactor});`;
		}
	},

	methods: {
		hideModal() {
			this.$emit('close');
		}
	}
};

</script>

<style lang="stylus" scoped>

@import "../../../stylus/variables.styl"

.modal
	height 100%
	width 100%
	position fixed
	top 0
	left 0
	pointer-events none
	overflow hidden
	z-index 10000000000

	+touch()
		height 100vh

	.modal-blanket
		height 100%
		width 100%
		position absolute
		top 0
		left 0
		background $primary
		opacity .5
		transition all 0.5s cubic-bezier(0.895, 0.03, 0.685, 0.22)
		will-change transform

		+touch()
			width 100vw
			height 100vh

	.modal-dialog
		width 550px
		position absolute
		top 50%
		left 50%
		opacity 0
		transform translate(-50%, -50%) scale(0.8)
		transition all 0.5s cubic-bezier(0.895, 0.03, 0.685, 0.22)
		z-index 10000001
		max-height 90%

		header
			padding-bottom 1rem

		main
			overflow-y auto

		footer
			padding-top 1.5rem

	&.is-active
		pointer-events auto

		.modal-blanket
			opacity .9
			transition all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)

		.modal-dialog
			opacity 1
			transform translate(-50%, -50%) scale(1)
			transition all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)

</style>
