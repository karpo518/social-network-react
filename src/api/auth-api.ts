import { EResultCodeCaptcha, EResultCodes, instance, TResponse } from "./api"

export type TMeResponseData = {
    id: number
    email: string
    login: string
}

export type TLoginResponseData = {
    userId: number
}

export type TGetCaptchaUrlResponse = {
    url: string
}

export const authAPI = {
    me() {
        console.log('GET: auth/me')
        return instance.get<TResponse<TMeResponseData>>('auth/me')
    },
    login(email: string, password: string, rememberMe = false, captcha = '') {
        console.log(`POST: auth/login`)
        return instance.post<TResponse<TLoginResponseData,EResultCodes | EResultCodeCaptcha>>(`auth/login`,{email: email, 
                                                                                                            password: password, 
                                                                                                            rememberMe: rememberMe, 
                                                                                                            captcha: captcha})
    },
    logout() {
        console.log(`DELETE: auth/login`)
        return instance.delete<TResponse>(`auth/login`)
    },

    captchaUrl() {
        console.log(`GET: security/get-captcha-url`)
        return instance.get<TGetCaptchaUrlResponse>(`security/get-captcha-url`)
    },

}