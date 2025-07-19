import { request } from "../../utils/req";

export function getPointRecentList() {
	return request({
		method: 'GET',
		url: '/fuyu/checkin/status?task_id=6',
		data: {}
	}).then(res => res.data)
}

export function completeSignIn() {
	return request({
		method: 'POST',
		url: '/fuyu/checkin/do',
		data: {
			task_id: 5
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