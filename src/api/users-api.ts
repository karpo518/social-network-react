import { TUser } from "../types/types"
import { TGetItems, instance, TResponse } from "./api"

export const usersAPI = {
    
    getUsers(currentPage = 1, pageSize = 10) {
        console.log(`GET: users?page=${currentPage}&count=${pageSize}`)
        return instance.get<TGetItems<TUser>>(`users?page=${currentPage}&count=${pageSize}`)
    },

    follow(userId: number) {
        console.log(`POST: follow/${userId}`)
        return instance.post<TResponse>(`follow/${userId}`,{})
    },

    unfollow(userId: number) {
        console.log(`DELETE: follow/${userId}`)
        return instance.delete<TResponse>(`follow/${userId}`)
    },
}