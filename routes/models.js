/**
 * Model routes
 */


/* Dependencies */

import process from 'node:process';

import getConfig from '../utils/getConfig.js';

import { digest } from '@sapling/sapling/core/loadModel.js';


export default {
	read: async (request, response) => {
		try {
			response.json(await digest.call({
				config: await getConfig(),
				dir: process.cwd(),
				opts: {}
			}));
		} catch (error) {
			response.status(500).send(error);
		}
	}
};
