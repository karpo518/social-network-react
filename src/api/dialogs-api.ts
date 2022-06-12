import { TDialog, TMessage, TNewMessage } from "../types/types"
import { TGetItems, instance, TResponse } from "./api"

export type TSendMessageResponseData = { message: TMessage & TNewMessage }

export const dialogsAPI = {
    get() {
        console.log(`GET: dialogs`)
        return instance.get<Array<TDialog>>(`dialogs`)
    },

    startChatting(userId: number) {
        console.log(`PUT: dialogs/${userId}`)
        return instance.put<TResponse>(`dialogs/${userId}`,{})
    },

    getMessages(userId: number) {
        console.log(`GET: dialogs/${userId}/messages`)
        return instance.get<TGetItems<TMessage>>(`dialogs/${userId}/messages`)
    },

    sendMessage(userId: number, body: string) {
        console.log(`POST: dialogs/${userId}/messages`)
        return instance.post<TResponse<TSendMessageResponseData>>(`dialogs/${userId}/messages`,{body: body})
    },
}