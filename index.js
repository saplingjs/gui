/**
 * Sapling GUI
 */


/* Dependencies */

import fs from 'node:fs';
import process from 'node:process';
import yargs from 'yargs';
/* eslint-disable-next-line node/file-extension-in-import */
import { hideBin } from 'yargs/helpers';

import { App } from '@tinyhttp/app';
import sirv from 'sirv';
import open from 'open';


/* Create server */

const app = new App();


/* Static assets */

app.use(`/js`, sirv('dist/js', { maxAge: 1 }));
app.use(`/css`, sirv('dist/css', { maxAge: 1 }));


/* Respond to everything else with the same view, let Vue handle routing */

app.get('*', (request, response) => {
	response.send(fs.readFileSync('src/index.html').toString());
});


/* Listen on the port defined, or 4000 */

const argv = yargs(hideBin(process.argv)).argv;
const port = Number(argv.port) || 4000
app.listen(port);


/* Open the browser */

open(`http://localhost:${port}`);
