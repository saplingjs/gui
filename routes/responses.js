/**
 * Response routes
 */


/* Dependencies */

import { promises as fs } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';

import exists from '../utils/exists.js';
import getConfig from '../utils/getConfig.js';

import { json } from 'milliparsec';


async function getResponseFile(file) {
	const config = await getConfig();
	const local = path.join(process.cwd(), 'static/response', `${file}.${config.extension}`);

	if (await exists(local)) {
		const html = await fs.readFile(local);
		return html.toString();
	} else {
		const require = createRequire(import.meta.url);
		const html = await fs.readFile(require.resolve(`@sapling/sapling/static/response/${file}.${config.extension}`));
		return html.toString();
	}
}

async function saveResponseFile(file, contents) {
	const config = await getConfig();
	const filePath = path.join(process.cwd(), 'static/response');

	if (!(await exists(filePath))) {
		await fs.mkdir(filePath, { recursive: true });
	}

	await fs.writeFile(path.join(filePath, `${file}.${config.extension}`), contents);
}


export default {
	read: async (request, response) => {
		const responses = {
			404: await getResponseFile('404'),
			500: await getResponseFile('500'),
			data: await getResponseFile('data'),
			error: await getResponseFile('error')
		};

		response.json(responses);
	},

	write: async (request, response) => {
		/* Parse body */
		await json()(request, response, (err) => void err && console.log(err));

		try {
			if ('404' in request.body) await saveResponseFile('404', request.body['404']);
			if ('500' in request.body) await saveResponseFile('500', request.body['500']);
			if ('data' in request.body) await saveResponseFile('data', request.body['data']);
			if ('error' in request.body) await saveResponseFile('error', request.body['error']);
			response.sendStatus(200);
		} catch (error) {
			console.log(error);
			response.status(500).send(error);
		}
	}
};
