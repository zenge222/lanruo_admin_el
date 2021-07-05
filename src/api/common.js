
import request from '@/utils/requests'
import api from '@/api/apiConfig'

// 图片上传
export function _uploadPic(data) {
    return request('config/upload/image', 'post', data);
}

// 省市区联动获取
export function provincePackage(data) {
    return request('/common/address/list', 'get', data)
}
