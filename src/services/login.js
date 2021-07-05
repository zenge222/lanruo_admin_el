import request from '@/utils/requests'
import api from '@/api/apiConfig'

export function _login(data) {
    return request(`common/login?code=${data.code}&password=${data.password}&username=${data.username}`, 'post');
}

export function _logout() {
    return request('project/list', 'get')
}




