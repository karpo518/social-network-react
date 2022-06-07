import { DialogType, MessageType, NewMessageType, ProfileType, UserType } from './../types/types';
import axios, { AxiosRequestConfig } from "axios";

export enum EResultCodes {
    Success = 0,
    Error = 1,
}

export enum EResultCodeCaptcha {
    CaptchaIsRequired = 10,
}

export type DefaultResponseType = {
    data: Object
    messages: Array<string>
    fieldsErrors: Array<string>,
    resultCode: EResultCodes
}

const getAPIKey = () => {
    return localStorage.getItem('apiKey') || ''
}

export const setAPIKey = (apiKey: string) => {
    localStorage.setItem('apiKey', apiKey)
}

let axiosConfig: AxiosRequestConfig = {
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true, 
    headers: {'API-KEY': getAPIKey()}
}

let instance = axios.create(axiosConfig);

export const updateAPIKey = (apiKey = '') => {
    setAPIKey(apiKey)
    if(axiosConfig.headers) {
      axiosConfig.headers['API-KEY'] = apiKey
    }
    instance = axios.create(axiosConfig);
}

namespace UsersApiTypes { 
    export type GetUsers = { 
        items: Array<UserType>
        totalCount: number
        error: any
    }
    export type Follow = DefaultResponseType
    export type Unfollow = DefaultResponseType
    export type GetProfile = ProfileApiTypes.GetProfile
}

export const usersAPI = {
    
    getUsers(currentPage = 1, pageSize = 10) {
        console.log(`GET: users?page=${currentPage}&count=${pageSize}`)
        return instance.get<UsersApiTypes.GetUsers>(`users?page=${currentPage}&count=${pageSize}`)
    },

    follow(userId: number) {
        console.log(`POST: follow/${userId}`)
        return instance.post<UsersApiTypes.Follow>(`follow/${userId}`,{})
    },

    unfollow(userId: number) {
        console.log(`DELETE: follow/${userId}`)
        return instance.delete<UsersApiTypes.Unfollow>(`follow/${userId}`)
    },

    getProfile(userId: number) {
        console.warn('Obsolete method! Please, use profileAPI object!')
        return profileAPI.getProfile(userId);
    },
}

namespace ProfileApiTypes { 
    export type GetProfile = ProfileType
    export type GetStatus = string
    export type UpdateStatus = {
        data: Array<any>
        messages: Array<string>
        fieldsErrors: Array<string>
        resultCode: EResultCodes
    }
    export type SavePhoto = {
        data: {
            photos?: {
              small: string
              large: string
            }
          }
        messages: Array<string>
        fieldsErrors: Array<string>,
        resultCode: EResultCodes
    }

    export type SaveProfile = DefaultResponseType
}

export const profileAPI = {
    
    getProfile(userId: number) {
        console.log(`GET: profile/${userId}`)
        return instance.get<ProfileApiTypes.GetProfile>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        console.log(`GET: profile/status/${userId}`)
        return instance.get<ProfileApiTypes.GetStatus>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        console.log(`PUT: profile/status`)
        return instance.put<ProfileApiTypes.UpdateStatus>(`profile/status`,{status: status});
    },
    savePhoto(photoFile: any) {
        console.log(`PUT: profile/photo`)
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<ProfileApiTypes.SavePhoto>(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
    },
    saveProfile(profile: ProfileType) {
        console.log(`PUT: profile`)
        return instance.put<ProfileApiTypes.SaveProfile>(`profile`, profile);
    },
}

namespace AuthApiTypes{
    export type Me = {
        data: {
            id: number
            email: string
            login: string
        }
        resultCode: EResultCodes
        messages: Array<string>
    }
    
    export type Login = {
        resultCode:  EResultCodes | EResultCodeCaptcha
        messages: Array<string>
        fieldsErrors: Array<string>
        data: {
            userId: number
            login: string
        }
    }

    export type Logout = {
        resultCode: EResultCodes
    }

    export type CapthaUrl = {
        url: string
    }
}

export const authAPI = {
    me() {
        console.log('GET: auth/me')
        return instance.get<AuthApiTypes.Me>('auth/me')
    },
    login(email: string, password: string, rememberMe = false, captcha = '') {
        console.log(`POST: auth/login`)
        return instance.post<AuthApiTypes.Login>(`auth/login`,{email: email, password: password, rememberMe: rememberMe, captcha: captcha})
    },
    logout() {
        console.log(`DELETE: auth/login`)
        return instance.delete<AuthApiTypes.Logout>(`auth/login`)
    },

    captchaUrl() {
        console.log(`GET: security/get-captcha-url`)
        return instance.get<AuthApiTypes.CapthaUrl>(`security/get-captcha-url`)
    },

}

namespace DialogsApiTypes{

    export type Get = Array<DialogType>
    
    export type StartChatting = any

    export type GetMessages = {
        items: Array<MessageType>
        totalCount: number
        error: any
    }

    export type SendMessage = {
        data: { message: MessageType & NewMessageType  }
        messages: Array<string>
        fieldsErrors: Array<string>,
        resultCode: EResultCodes
    }
}

export const dialogsAPI = {
    get() {
        console.log(`GET: dialogs`)
        return instance.get<DialogsApiTypes.Get>(`dialogs`)
    },

    startChatting(userId: number) {
        console.log(`PUT: dialogs/${userId}`)
        return instance.put<DialogsApiTypes.StartChatting>(`dialogs/${userId}`,{})
    },

    getMessages(userId: number) {
        console.log(`GET: dialogs/${userId}/messages`)
        return instance.get<DialogsApiTypes.GetMessages>(`dialogs/${userId}/messages`)
    },

    sendMessage(userId: number, body: string) {
        console.log(`POST: dialogs/${userId}/messages`)
        return instance.post<DialogsApiTypes.SendMessage>(`dialogs/${userId}/messages`,{body: body})
    },
}


     