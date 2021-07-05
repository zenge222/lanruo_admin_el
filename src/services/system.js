import request from '@/utils/requests'
import api from '@/api/apiConfig'

// 获取指定用户菜单
export function _userMenus(id) {
    return request('menuSetting/user/menu' + '?id=' + id, 'get')
}

// 管理者-列表
export function _getManagerList(data) {
    return request('dormitoryBuilding/manager/list', "get", data)
}

// 宿舍楼-添加（修改）
export function _dormitoryAddEdit(data) {
    return request('dormitoryBuilding/dormitoryBuilding/add', "post", data)
}

// 宿舍楼-列表
export function _getDormitoryList(data) {
    return request('dormitoryBuilding/dormitoryBuilding/list', 'get', data)
}

// 宿舍楼-删除
export function _dormitoryDel(id) {
    return request('dormitoryBuilding/dormitoryBuilding/delete' + '?id=' + id, 'get')
}

// 宿舍楼-详情
export function _dormitoryDetail(id) {
    return request('dormitoryBuilding/dormitoryBuilding/detail' + '?id=' + id, 'get')
}

// 房间-新增（修改）
export function _roomAddEdit(data) {
    return request('room/add', "post", data)
}

// 房间-列表
export function _getRoomList(data) {
    return request('room/list', 'get', data)
}

// 房间-删除
export function _roomDel(id) {
    return request('room/delete' + '?id=' + id, 'get')
}

// 角色添加（修改）
export function _roleAddEdit(data) {
    return request('menuSetting/role/add', "post", data)
}

// 角色列表
export function _roleList(data) {
    return request('menuSetting/role/list', 'get', data)
}

// 房间-详情
export function _roomDetail(id) {
    return request('room/detail' + '?id=' + id, 'get')
}

// 校区-列表
export function _schoolList(id) {
    return request('room/school/list', 'get')
}

// 物品-列表
export function _toolList(data) {
    return request('tool/list', 'get', data)
}

// 仓库物品-列表
export function _toolStockList(data) {
    return request('tool/toolStock/list', 'get', data)
}

// 物品-新增（修改）
export function _toolAddEdit(data) {
    return request('tool/add', 'post', data)
}

// 仓库物品-入库-出库
export function _toolsStockLogManage(data) {
    return request('tool/toolsStockLog/manage', 'get', data)
}

// 仓库物品出入库记录-列表
export function _toolsStockLogList(data) {
    return request('tool/toolsStockLog/list', 'get', data)
}

// 日常-上课起始分-获取
export function _getBaseScore(type) {
    return request('gradeConfig/baseScore' + '?type=' + type, 'get')
}

// 日常-上课起始分-修改
export function _baseScoreUpdate(data) {
    return request('gradeConfig/baseScore/update' + '?score=' + data.startPoint + '&type=' + data.type, 'get', data)
}

// 日常-上课-实习评分-添加(修改)
export function _gradeConfigAddEdit(data) {
    return request('gradeConfig/add', 'get', data)
}



















