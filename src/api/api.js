import * as axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true, 
    headers: {'API-KEY': 'ca88a817-bcc4-4b1c-ad58-f6ba9d58a4e1'} //karpo518 23678
    // headers: {'API-KEY': 'c2384874-7056-4df7-bb1e-0932abfb3ff5'} //karas518 24133

});

export const usersAPI = {
    
    getUsers(currentPage = 1, pageSize = 10) {
        console.log(`GET: users?page=${currentPage}&count=${pageSize}`)
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },

    follow(userId) {
        console.log(`POST: follow/${userId}`)
        return instance.post(`follow/${userId}`,{})
    },

    unfollow(userId) {
        console.log(`DELETE: follow/${userId}`)
        return instance.delete(`follow/${userId}`)
    },

    getProfile(userId) {
        console.warn('Obsolete method! Please, use profileAPI object!')
        return profileAPI.getProfile(userId);
    },

}

export const profileAPI = {
    
    getProfile(userId) {
        console.log(`GET: profile/${userId}`)
        return instance.get(`profile/${userId}`)
    },

    getStatus(userId) {
        console.log(`GET: profile/status/${userId}`)
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        console.log(`PUT: profile/status`)
        return instance.put(`profile/status`,{status: status});
    },
}

export const authAPI = {
    me() {
        console.log('GET: auth/me')
        return instance.get('auth/me')
    },
    login(email, password, rememberMe = false, captcha = null) {
        console.log(`POST: auth/login`)
        return instance.post(`auth/login`,{email: email, password: password, rememberMe: rememberMe, captcha: captcha})
    },
    logout() {
        console.log(`DELETE: auth/login`)
        return instance.delete(`auth/login`)
    },

    captchaUrl() {
        console.log(`GET: security/get-captcha-url`)
        return instance.get(`security/get-captcha-url`)
    },

}

export const dialogsAPI = {
    get() {
        console.log(`GET: dialogs`)
        return instance.get(`dialogs`)
    },

    startChatting(userId) {
        console.log(`PUT: dialogs/${userId}`)
        return instance.put(`dialogs/${userId}`,{})
    },

    getMessages(userId) {
        console.log(`GET: dialogs/${userId}/messages`)
        return instance.get(`dialogs/${userId}/messages`)
    },

    sendMessage(userId, body) {
        console.log(`POST: dialogs/${userId}/messages`)
        return instance.post(`dialogs/${userId}/messages`,{body: body})
    },

}



     