/**
 * Sapling GUI
 */


/* Dependencies */

import { fileURLToPath } from 'node:url';
import { readFileSync as read, existsSync as exists } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import yargs from 'yargs';
/* eslint-disable-next-line node/file-extension-in-import */
import { hideBin } from 'yargs/helpers';

import { App } from '@tinyhttp/app';
import getPort from 'get-port';
import sirv from 'sirv';
import open from 'open';

import config from './routes/config.js';
import fs from './routes/fs.js';
import models from './routes/models.js';
import responses from './routes/responses.js';
import utils from './routes/utils.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));


/* Create server */

const app = new App();


/* Static assets */

const sirvSettings = {
	maxAge: 1,
	dev: process.env.NODE_ENV !== 'production',
};

app.use('/js', sirv(path.join(__dirname, 'dist/js'), sirvSettings));
app.use('/css', sirv(path.join(__dirname, 'dist/css'), sirvSettings));
app.use('/images', sirv(path.join(__dirname, 'dist/images'), sirvSettings));


/* Data routes */

app.get('/config/read', config.read);
app.post('/config/write', config.write);
app.get('/fs/dirs', fs.dirs);
app.get('/fs/files/:extension?', fs.files);
app.get('/models/read', models.read);
app.get('/responses/read', responses.read);
app.post('/responses/write', responses.write);
app.get('/utils/ping/:port?', utils.ping);


/* Respond to everything else with the same view, let Vue handle routing */

app.get('*', (request, response) => {
	/* Guess whether it's a valid Sapling project or not */
	if (exists(path.join(process.cwd(), 'node_modules/@sapling/sapling'))) {
		response.send(read(path.join(__dirname, 'dist/views/index.html')).toString());
	} else {
		const html = read(path.join(__dirname, 'dist/views/invalid.html')).toString();
		response.send(html.replace('<span>this directory</span>', `<code>${process.cwd()}</code>`));
	}
});


/* Listen on the port defined, or 4000 */

const argv = yargs(hideBin(process.argv)).argv;
const port = await getPort({ port: Number(argv.port) || 4000 });
app.listen(port);


/* Open the browser */

open(`http://localhost:${port}`);
