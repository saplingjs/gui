/**
 * Config routes
 */


/* Dependencies */

import { readFileSync as read, existsSync as exists } from 'node:fs';
import path from 'node:path';
import process from 'node:process';


export default {
	read: (request, response) => {
		const configFile = path.join(process.cwd(), 'config.json');

		if (exists(configFile)) {
			try {
				response.json(JSON.parse(read(configFile).toString()));
			} catch (error) {
				response.status(500).send(error);
			}
		} else {
			response.json({"name": "untitled"});
		}
	}
};
