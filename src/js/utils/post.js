import axios from 'axios';

export default function post(url, payload) {
	return axios.post(url, payload)
		.then(response => response);
}
