import { friendsOnly } from "../redux/users-reducer";
import { TUser } from "../types/types"
import { TGetItems, instance, TResponse } from "./api"

export const usersAPI = {
    
    getUsers(currentPage = 1, pageSize = 10, isFriend = 0 as 0 | 1 | 2, term = null as null | string ) {
        let request =`users?page=${currentPage}&count=${pageSize}`
        if(term) {
            request += `&term=${term}`;
        }
        if(isFriend !== friendsOnly.Any) {
            request += `&friend=` + (isFriend === friendsOnly.Yes ? 'true' : 'false') 
        }
        console.log(`GET: users?page=${currentPage}&count=${pageSize}`)
        return instance.get<TGetItems<TUser>>(request)
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