import capitalize from './capitalize.js';

export default function formatMeta(key, value, meta) {
	const formattedMeta = meta ? meta : { label: capitalize(key).replaceAll('.', ' ') };
	return formattedMeta[value] ? formattedMeta[value] : '';
}
