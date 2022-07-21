import { TChatMessage } from "../components/Chat/Messages";
import { TWsStatus } from "../redux/chat-reducer";

type TEventNames = 'messagesReceived' | 'statusChanged' | 'errorOccurred'

type TNewMessagesSubscriber = (messages: TChatMessage[]) => void

type TChangeStatusSubscriber = (newStatus: TWsStatus) => void

type TErrorSubscriber = (e: Event) => void

type TEventSubscribers = {
    messagesReceived: TNewMessagesSubscriber[],
    statusChanged: TChangeStatusSubscriber[]
    errorOccurred: TErrorSubscriber[]
}

let eventSubscribers: TEventSubscribers = {
    messagesReceived: [],
    statusChanged: [],
    errorOccurred: [],
}

const wsUrl = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

let ws: WebSocket

export const createChannel = () => {
    if(ws !== undefined) {
        removeChannel()
    }
    ws = new WebSocket(wsUrl)
    ws.addEventListener('error', errorHandler)
    ws.addEventListener('open', changeStatusHandler)
    ws.addEventListener('message', newMessagesHandler)
    ws.addEventListener('close', changeStatusHandler)
}

export const removeChannel = () => {
    ws?.close()
    ws?.removeEventListener('open', changeStatusHandler)
    ws?.removeEventListener('message', newMessagesHandler)
    ws?.removeEventListener('close', changeStatusHandler)
    ws?.removeEventListener('error', errorHandler)
}

export const newMessagesHandler = (e: MessageEvent) => { 
    const newMessages = JSON.parse(e.data)
    eventSubscribers.messagesReceived.forEach((callback: TNewMessagesSubscriber) => { callback(newMessages) } )
}

export const changeStatusHandler = (e: Event | CloseEvent) => { 
    
    let newStatus = ((e.type === 'open') ? WebSocket.OPEN : WebSocket.CLOSED) as TWsStatus

    eventSubscribers.statusChanged.forEach((callback: TChangeStatusSubscriber) => { callback(newStatus) } )

    if(newStatus === WebSocket.CLOSED) {
        setTimeout(createChannel, 3000)
    }
}

export const errorHandler = (e: Event) => {
    eventSubscribers.errorOccurred.forEach((callback: TErrorSubscriber) => { callback(e) } )
}

export const chatAPI = {
    start() {
        if(!ws || ws.readyState !== WebSocket.OPEN) {
            createChannel()
        }
    },
    stop() {
        if(ws?.readyState === WebSocket.OPEN) {
            removeChannel()
        }
    },
    status() {
        return ws ? ws.readyState : WebSocket.CLOSED
    },
    subscribe(eventName: TEventNames, callback: TNewMessagesSubscriber | TChangeStatusSubscriber | TErrorSubscriber) {
        // @ts-ignore
        eventSubscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            eventSubscribers[eventName] = eventSubscribers[eventName].filter((s) => s !== callback)
        }
    },
    unsubscribe(eventName: TEventNames, callback: TNewMessagesSubscriber | TChangeStatusSubscriber | TErrorSubscriber) {
        // @ts-ignore
        eventSubscribers[eventName] = eventSubscribers[eventName].filter((s) => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}