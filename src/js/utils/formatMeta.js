import capitalize from './capitalize.js';

export default function formatMeta(key, value, meta) {
	let formattedMeta = meta ? meta : { label: capitalize(key).replaceAll('.', ' ') };
	return formattedMeta[value] ? formattedMeta[value] : '';
}
