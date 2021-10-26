/**
 * Sapling GUI
 */


/* Dependencies */

import { readFileSync as read, existsSync as exists } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'url';
import yargs from 'yargs';
/* eslint-disable-next-line node/file-extension-in-import */
import { hideBin } from 'yargs/helpers';

import { App } from '@tinyhttp/app';
import sirv from 'sirv';
import open from 'open';


const __dirname = path.dirname(fileURLToPath(import.meta.url));


/* Create server */

const app = new App();


/* Static assets */

app.use(`/js`, sirv(path.join(__dirname, 'dist/js'), { maxAge: 1 }));
app.use(`/css`, sirv(path.join(__dirname, 'dist/css'), { maxAge: 1 }));


/* Respond to everything else with the same view, let Vue handle routing */

app.get('*', (request, response) => {
	/* Guess whether it's a valid Sapling project or not */
	if (exists(path.join(process.cwd(), 'node_modules/@sapling/sapling'))) {
		response.send(read(path.join(__dirname, 'src/index.html')).toString());
	} else {
		const html = read(path.join(__dirname, 'src/invalid.html')).toString();
		response.send(html.replace('<span>this directory</span>', `<code>${process.cwd()}</code>`));
	}
});


/* Listen on the port defined, or 4000 */

const argv = yargs(hideBin(process.argv)).argv;
const port = Number(argv.port) || 4000;
app.listen(port);


/* Open the browser */

open(`http://localhost:${port}`);
