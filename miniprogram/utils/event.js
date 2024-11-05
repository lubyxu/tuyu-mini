/**
 * @file event emiiter
 */

export const eventMap = {};

export const on = function (eventName, callback) {
	eventMap[eventName] = eventMap[eventName] || [];
	eventMap[eventName].push(callback);
	return function () {
		eventMap[eventName] = eventMap[eventName].filter(cb => cb !== callback);
	}
};

export const emit = function (eventName, ...payload) {
	const cbs = eventMap[eventName] || [];
	cbs.forEach(cb => cb(...payload));
}