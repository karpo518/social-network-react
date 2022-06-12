import { TProfile } from "../types/types"
import { instance, TResponse } from "./api"

export type TSavePhotoResponseData = {
    photos: {
        small: string
        large: string
      }
}

export const profileAPI = {
    
    getProfile(userId: number) {
        console.log(`GET: profile/${userId}`)
        return instance.get<TProfile>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        console.log(`GET: profile/status/${userId}`)
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        console.log(`PUT: profile/status`)
        return instance.put<TResponse>(`profile/status`,{status: status});
    },
    savePhoto(photoFile: File) {
        console.log(`PUT: profile/photo`)
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<TResponse<TSavePhotoResponseData>>(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
    },
    saveProfile(profile: TProfile) {
        console.log(`PUT: profile`)
        return instance.put<TResponse>(`profile`, profile);
    },
}