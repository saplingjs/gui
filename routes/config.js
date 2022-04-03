/**
 * Config routes
 */


/* Dependencies */

import { writeFileSync as write } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { digest } from '@sapling/sapling/core/loadConfig.js';

import dot from 'dot-object';
import { json } from 'milliparsec';


export default {
	async read(request, response) {
		try {
			response.json(await digest.call({
				dir: process.cwd(),
				opts: {},
			}));
		} catch (error) {
			response.status(500).send(error);
		}
	},

	async write(request, response) {
		/* Parse body */
		await json()(request, response, error => void error && console.log(error));

		const configFile = path.join(process.cwd(), 'config.json');
		try {
			write(configFile, JSON.stringify(dot.object(request.body), null, 2));
			response.sendStatus(200);
		} catch (error) {
			console.log(error);
			response.status(500).send(error);
		}
	},
};
