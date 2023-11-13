export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/allow/no_backend": [3],
		"/allow/server_page/allowed/functions": [~4],
		"/allow/server_page/allowed/klass": [~5],
		"/block/server_page/no_policy": [~6],
		"/block/server_page/not_allowed/functions": [~7],
		"/block/server_page/not_allowed/klass": [~8],
		"/block/server_page/not_called/functions": [~9],
		"/block/server_page/not_called/klass": [~10]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';