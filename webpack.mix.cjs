const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining Webpack build steps.
 |
 */

mix
	.js('src/js/app.js', 'dist/js/').vue()
	.stylus('src/stylus/app.styl', 'dist/css/');
