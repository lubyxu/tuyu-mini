import { request } from "../../utils/req";

export function getPointRecentList() {
	return request({
		method: 'GET',
		url: '/fuyu/checkin/status',
		data: {}
	}).then(res => res.data)
}

export function completeSignIn(task_id) {
	return request({
		method: 'POST',
		url: '/fuyu/checkin/do',
		data: {
			task_id
		}
	})
}

export function getPointCount() {
	return request({
		method: 'GET',
		url: '/fuyu/points/info',
		data: {}
	}).then(res => res.data)
}

export function getMemberTasks() {
	return request({
		method: 'GET',
		url: '/fuyu/member/tasks'
	}).then(res => res.data)
}

export function completeMemberTask(id) {
	return request({
		method: 'POST',
		url: '/fuyu/member/task/complete',
		data: {
			task_id: id
		}
	})
}