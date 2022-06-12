import axios, { AxiosRequestConfig } from "axios";

export enum EResultCodes {
    Success = 0,
    Error = 1,
}

export enum EResultCodeCaptcha {
    CaptchaIsRequired = 10,
}

export type TResponse<D = {}, RC = EResultCodes> = {
    data: D
    messages: Array<string>
    fieldsErrors?: Array<string>,
    resultCode: RC
}

export type TGetItems<TItem> = {

    items: Array<TItem>
    totalCount: number
    error: string | null

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

export let instance = axios.create(axiosConfig);

export const updateAPIKey = (apiKey = '') => {
    setAPIKey(apiKey)
    if(axiosConfig.headers) {
      axiosConfig.headers['API-KEY'] = apiKey
    }
    instance = axios.create(axiosConfig);
}


     