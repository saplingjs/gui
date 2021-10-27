/**
 * Util routes
 */


/* Dependencies */
import isPortReachable from 'is-port-reachable';


export default {
	ping: async (request, response) => {
		const port = request.params.port || 3000;
		const reachable = await isPortReachable(port, { host: 'localhost' });
		response.sendStatus(reachable ? 200 : 500);
	}
};
