import {getUserInfo, loginByUsername, logout} from "../../api/login";
import {getToken, removeToken, setToken} from "../../utils/auth";

const user = {
    state: {
        token: getToken(),
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        }
    },

    actions: {
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                loginByUsername(username, userInfo.password).then(response => {
                    commit('SET_TOKEN', response.result)
                    setToken(response.result)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    const data = response
                    const roleArr = data.result.roles
                    const privilegesArr = []
                    const privilegesButtonArr = []
                    data.result.privileges.forEach(function(item) {
                        if (item.type === 'menu') {
                            privilegesArr.push(item.code)
                        } else {
                            privilegesButtonArr.push(item.code)
                        }
                    })
                    if (privilegesArr.length === 0) {
                        privilegesArr.push('p_zhuye')
                    }
                    // const buttonPrivilegesArr = data.result.privileges
                    commit('SET_ROLES', roleArr)
                    commit('SET_PRIVILEGES', privilegesArr)
                    commit('SET_BUTTON_PRIVILEGES', privilegesButtonArr)
                    commit('SET_NAME', data.result.user ? data.result.user.name : data.result.user.name)
                    commit('SET_AVATAR', data.result.user ? data.result.user.photo : '')
                    // commit('SET_INTRODUCTION', data.introduction)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 第三方验证登录
        // LoginByThirdparty({ commit, state }, code) {
        //   return new Promise((resolve, reject) => {
        //     commit('SET_CODE', code)
        //     loginByThirdparty(state.status, state.email, state.code).then(response => {
        //       commit('SET_TOKEN', response.data.token)
        //       setToken(response.data.token)
        //       resolve()
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },
        // 动态修改权限
        ChangeRoles({ commit }, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    resolve()
                })
            })
        },
        setPrivilege({ commit }, type) {
            if (type === 'system') {
                commit('SET_PROJECT_PRIVILEGES', [])
                commit('SET_PROJECT_BUTTON_PRIVILEGES', [])
            } else {
                commit('SET_PRIVILEGES', [])
                commit('SET_BUTTON_PRIVILEGES', [])
            }
        },
        // 获取项目权限
        getProjectPrivileges({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    const data = response
                    const roleArr = data.result.roles
                    const privilegesArr = ['P_xxgl']
                    const privilegesButtonArr = []
                    // const buttonPrivilegesArr = data.result.privileges
                    commit('SET_ROLES', roleArr)
                    commit('SET_NAME', data.result.user ? data.result.user.name : data.result.user.name)
                    commit('SET_AVATAR', data.result.user ? data.result.user.photo : '')
                    commit('SET_PROJECT_PRIVILEGES', privilegesArr)
                    commit('SET_PROJECT_BUTTON_PRIVILEGES', privilegesButtonArr)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user
