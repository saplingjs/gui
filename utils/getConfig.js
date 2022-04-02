/**
 * Get config from Sapling
 */


/* Dependencies */

import { digest } from '@sapling/sapling/core/loadConfig.js';


export default async function getConfig() {
	try {
		return await digest.call({
			dir: process.cwd(),
			opts: {}
		});
	} catch (error) {
		process.exit(`Error loading config: ${error}`);
	}
};
