import Vue from 'vue'
import { constantRoutes } from '@/router'
import { _userMenus } from '@/services/system'
import Layout from '@/layout/index'
import vueRouter from 'vue-router'
import router from '../../router/index'
import store from '..'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 把后台返回菜单组装成routes要求的格式
 * @param {*} routes
 */
export function getAsyncRoutes(routes) {
    const res = []
    const keys = ['path', 'name', 'children', 'redirect', 'alwaysShow', 'meta', 'hidden']
    routes.forEach(item => {
        item.alwaysShow = true;
        item.hidden = item.hidden == 0 ? false : true;
        let newItem = { meta: { title: '', icon: '' } }

        if (item.component) {
            if (item.component === 'layout/index') {
                newItem.component = Layout
            } else {
                // webpack在编辑es6的时候动态引入import()时不能传入变量
                // newItem.component = () => import(`@/views/${item.component}`)
                newItem.component = resolve => {
                    require(['@/views/' + item.component], resolve)
                }
            }
        }
        newItem.meta.title = item.title;
        newItem.meta.icon = item.icon;
        for (const key in item) {
            if (keys.includes(key)) {
                newItem[key] = item[key]
            }
        }
        if (newItem.children && newItem.children.length) {
            newItem.children = getAsyncRoutes(item.children)
        }
        if (newItem.children.length == 0) {
            Vue.delete(newItem, 'children')
            newItem.alwaysShow = false;
        }
        res.push(newItem)
    })
    return res
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [],
    addRoutes: [],
    roles: [],
    // showMenu: false // 处理刷新问题
}

const mutations = {
    SET_ROUTES: (state, data) => {
        state.addRoutes = data
        state.routes = constantRoutes.concat(data)
        // console.log(state.routes)
        router.matcher = new vueRouter({ mode: 'hash' }).matcher;
        router.addRoutes([...state.routes]);

    },
    SET_ROLES: (state, data) => {
        state.roles = data
    },
    CLEAR_ROLES: (state, data) => {
        state.roles = [];
    },
    SET_SHOW_MENU: (state, data) => {
        state.showMenu = data;
        console.log(state.showMenu)
    },
    SHOW_ADD_ROUTERS: (state) => {
        state.routes[2].children.forEach((item) => {
            item.hidden = false;
        });
        router.matcher = new vueRouter({ mode: 'hash' }).matcher;
        router.addRoutes([...state.routes]);
        console.log('SHOW_ADD_ROUTERS', router.options.routes)
    },

}

const actions = {
    generateRoutes({ commit }, roles, id) {
        return new Promise(async resolve => {
            let id = "";
            if (localStorage.getItem("userInfo")) {
                id = JSON.parse(localStorage.getItem("userInfo")).id;
            } else {
                router.push('Login')
                return;
            }
            // _userMenus(id).then(res => {
            // const resData = getAsyncRoutes(res.data);// 对路由格式进行处理
            // if (res.code == 1) {
            let resRoutes = [
                {
                    path: "/",
                    component: () => import("@/layout/index"),
                    redirect: "/home",
                    name: 'Home',
                    meta: { title: "xx管理", icon: "" },
                    alwaysShow: false,
                    children: [
                        {
                            path: "/home",
                            hidden: false,
                            name: "CutProject",
                            component: () => import("@/views/proManage/cutProject/index"),
                            meta: { title: "首页", icon: "el-icon-s-home", roles: ['admin'] }
                        },
                    ],
                },
                {
                    path: "/campusManage",
                    component: () => import("@/layout/index"),
                    redirect: "/campusManage",
                    name: "CampusManage",
                    meta: {title: "校区管理", icon: "el-icon-s-flag"},
                    alwaysShow: true,
                    children: [
                        {
                            path: "/campusList",
                            hidden: false,
                            name: "CampusList",
                            component: () => import("@/views/campusManage/campusList/index"),
                            meta: {title: "校区列表", icon: ""},
                        },
                    ]
                },
                {
                    path: "/personnelManage",
                    component: () => import("@/layout/index"),
                    redirect: "/personnelManage",
                    name: "PersonnelManage",
                    meta: { title: "人员管理", icon: "el-icon-user-solid" },
                    alwaysShow: true,
                    children: [
                        {
                            path: "/staffList",
                            hidden: false,
                            name: "StaffList",
                            component: () => import("@/views/personnelManage/staffList/index"),
                            meta: { title: "教职工列表", icon: "" },
                        },
                        {
                            path: "/studentsList",
                            hidden: false,
                            name: "StudentsList",
                            component: () => import("@/views/personnelManage/studentsList/index"),
                            meta: { title: "学员列表", icon: "" },
                        },
                        {
                            path: "/jobSetting",
                            hidden: false,
                            name: "JobSetting",
                            component: () => import("@/views/personnelManage/jobSetting/index"),
                            meta: { title: "教职工职务配置", icon: "" },
                        },
                    ]
                },
                {
                    path: "/teachingManage",
                    component: () => import("@/layout/index"),
                    redirect: "/teachingManage",
                    name: "TeachingManage",
                    meta: { title: "教学管理", icon: "el-icon-s-platform" },
                    alwaysShow: true,
                    children: [
                        {
                            path: "/lesson",
                            hidden: false,
                            name: "Lesson",
                            component: () => import("@/views/teachingManage/lesson/index"),
                            meta: { title: "课程列表", icon: "" },
                        },
                        {
                            path: "/class",
                            hidden: false,
                            name: "Class",
                            component: () => import("@/views/teachingManage/class/index"),
                            meta: { title: "班级列表", icon: "" },
                        },
                        {
                            path: "/assess",
                            hidden: false,
                            name: "Assess",
                            component: () => import("@/views/teachingManage/assess/index"),
                            meta: { title: "考核列表", icon: "" },
                        },
                    ]
                },
                {
                    path: "/livingQuartersManage",
                    component: () => import("@/layout/index"),
                    redirect: "/dormitoryManage",
                    name: "DormitoryManage",
                    meta: { title: "宿舍管理", icon: "el-icon-s-shop" },
                    alwaysShow: true,
                    children: [
                        {
                            path: "/dormitoryManage",
                            hidden: false,
                            name: "DormitoryManage",
                            component: () => import("@/views/livingQuartersManage/dormitoryManage/index"),
                            meta: { title: "宿舍楼管理", icon: "" },
                        },
                        {
                            path: "/dormitoryManage/dormitoryDetail",
                            hidden: true,
                            name: "DormitoryDetail",
                            component: () => import("@/views/livingQuartersManage/dormitoryDetail/index"),
                            meta: { title: "宿舍楼详情", icon: "" },
                        },
                        {
                            path: "/dormManage",
                            hidden: false,
                            name: "DormManage",
                            component: () => import("@/views/livingQuartersManage/dormManage/index"),
                            meta: { title: "房间管理", icon: "" },
                        },
                    ]
                },
                {
                    path: "/storageManage",
                    component: () => import("@/layout/index"),
                    redirect: "/GoodsList",
                    name: "StorageManage",
                    meta: { title: "仓储管理", icon: "el-icon-s-grid" },
                    alwaysShow: true,
                    children: [
                        {
                            path: "/goodsList",
                            hidden: false,
                            name: "GoodsList",
                            component: () => import("@/views/storageManage/goodsList/index"),
                            meta: { title: "物品列表", icon: "" },
                        },
                        {
                            path: "/libraryRecord",
                            hidden: false,
                            name: "LibraryRecord",
                            component: () => import("@/views/storageManage/libraryRecord/index"),
                            meta: { title: "出入库记录", icon: "" },
                        },
                        {
                            path: "/goodsConfig",
                            hidden: false,
                            name: "GoodsConfig",
                            component: () => import("@/views/storageManage/goodsConfig/index"),
                            meta: { title: "物品配置", icon: "" },
                        },
                    ]
                },
                {
                    path: "/accountManage",
                    component: () => import("@/layout/index"),
                    redirect: "/administratorList",
                    name: "AccountManage",
                    meta: { title: "账号管理", icon: "el-icon-s-order" },
                    alwaysShow: true,
                    children: [
                        {
                            path: "/administratorList",
                            hidden: false,
                            name: "AdministratorList",
                            component: () => import("@/views/accountManage/administratorList/index"),
                            meta: { title: "管理员账号", icon: "" },
                        },
                    ]
                },
                {
                    path: "/configManage",
                    component: () => import("@/layout/index"),
                    redirect: "/dailyScoreConfig",
                    name: "ConfigManage",
                    meta: { title: "配置管理", icon: "el-icon-s-claim" },
                    alwaysShow: true,
                    children: [
                        {
                            path: "/dailyScoreConfig",
                            hidden: false,
                            name: "DailyScoreConfig",
                            component: () => import("@/views/configManage/dailyScoreConfig/index"),
                            meta: { title: "日常评分配置", icon: "" },
                        },
                        {
                            path: "/classScoreConfig",
                            hidden: false,
                            name: "ClassScoreConfig",
                            component: () => import("@/views/configManage/classScoreConfig/index"),
                            meta: { title: "上课评分配置", icon: "" },
                        },
                        {
                            path: "/testScoreConfig",
                            hidden: false,
                            name: "TestScoreConfig",
                            component: () => import("@/views/configManage/testScoreConfig/index"),
                            meta: { title: "考试评分配置", icon: "" },
                        },
                        {
                            path: "/institutionConfig",
                            hidden: false,
                            name: "InstitutionConfig",
                            component: () => import("@/views/configManage/institutionConfig/index"),
                            meta: { title: "推荐机构配置", icon: "" },
                        },
                        {
                            path: "/practiceConfig",
                            hidden: false,
                            name: "PracticeConfig",
                            component: () => import("@/views/configManage/practiceConfig/index"),
                            meta: { title: "实习评分配置", icon: "" },
                        },
                    ]
                },
                {
                    path: "/systemManage",
                    component: () => import("@/layout/index"),
                    redirect: "/userManage",
                    name: "SystemManage",
                    meta: { title: "系统管理", icon: "el-icon-menu" },
                    alwaysShow: true,
                    children: [
                        {
                            path: "/menuManage",
                            hidden: false,
                            name: "MenuManage",
                            component: () => import("@/views/systemManage/menuManage/index"),
                            meta: { title: "菜单管理", icon: "" },
                        },
                        {
                            path: "/roleManage",
                            hidden: false,
                            name: "RoleManage",
                            component: () => import("@/views/systemManage/roleManage/index"),
                            meta: { title: "角色管理", icon: "" },
                        },
                    ]
                },
            ];
            commit('SET_ROUTES', resRoutes)
            // commit('SET_ROUTES', resData)
            resolve(resRoutes)
            // resolve(resData)
            // }
            // })
        });
    },
    getInfo({ commit }) {
        commit('SET_ROLES', ['admin'])
    },
    setShowMenu({ commit }, data) {
        commit('SET_SHOW_MENU', data)
    },
    clearRoles({ commit }) {
        commit('CLEAR_ROLES')
    },
    showAddRoutes({ commit, state }) {
        commit('SHOW_ADD_ROUTERS')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
