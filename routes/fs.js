/**
 * Filesystem routes
 */


/* Dependencies */
import path from 'node:path';
import process from 'node:process';
import dir from 'directory-tree';


function filterDirs(dirs, pos) {
	let filteredDirs = [];

	dirs.forEach((file) => {
		if (file.type === 'directory') {
			const currentPath = path.join(pos || '', file.name);
			filteredDirs.push(currentPath);
			filteredDirs = filteredDirs.concat(filterDirs(file.children, currentPath));
		}
	});

	return filteredDirs;
}

function filterFiles(files, pos) {
	let filteredFiles = [];

	files.forEach((file) => {
		const currentPath = path.join(pos || '', file.name);
		if (file.type !== 'directory') {
			filteredFiles.push(currentPath);
		} else {
			filteredFiles = filteredFiles.concat(filterFiles(file.children, currentPath));
		}
	});

	return filteredFiles;
}

export default {
	dirs: (request, response) => {
		const dirs = dir(process.cwd(), {
			exclude: /node_modules/,
			attributes: ['type']
		});

		response.json(filterDirs(dirs.children));
	},

	files: (request, response) => {
		/* https://github.com/tinyhttp/tinyhttp/issues/331 */
		const extension = request.params.extension !== 'undefined' ? request.params.extension : 'json';
		const dirs = dir(process.cwd(), {
			exclude: /node_modules/,
			attributes: ['type'],
			extensions: new RegExp(`\.${extension}$`)
		});

		response.json(filterFiles(dirs.children));
	}
};
