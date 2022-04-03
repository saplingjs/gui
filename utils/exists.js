/**
 * Check whether a file exists
 */


/* Dependencies */

import fs from 'node:fs';


export default async function exists(file) {
	try {
		await fs.promises.access(file, fs.constants.F_OK);
		return true;
	} catch {
		return false;
	}
};
