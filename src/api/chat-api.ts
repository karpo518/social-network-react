import { TChatMessage } from "../components/Chat/Messages";

type TNewMessagesSubscriber = (messages: TChatMessage[]) => void

let newMessagesSubscribers = [] as TNewMessagesSubscriber[]

type TChangeStatusSubscriber = (newStatus: 'open' | 'close') => void

let changeStatusSubscribers = [] as TChangeStatusSubscriber[]

const wsUrl = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

let ws: WebSocket

export const createChannel = () => {
    if(ws !== undefined) {
        removeChannel()
    }
    ws = new WebSocket(wsUrl)
    ws.addEventListener('open', changeStatusHandler)
    ws.addEventListener('message', newMessagesHandler)
    ws.addEventListener('close', changeStatusHandler)
}

export const removeChannel = () => {
    ws?.close()
    ws?.removeEventListener('open', changeStatusHandler)
    ws?.removeEventListener('message', newMessagesHandler)
    ws?.removeEventListener('close', changeStatusHandler)
}

/* export const closeHandler = () => { 
    setTimeout(() => { 
        ws?.removeEventListener('open', changeStatusHandler)
        ws?.removeEventListener('message', newMessagesHandler)
        ws?.removeEventListener('close', changeStatusHandler)
        createChannel()
    }, 3000) 
} */

export const newMessagesHandler = (e: MessageEvent) => { 
    // ws?.addEventListener('message', onNewMessages)
    const newMessages = JSON.parse(e.data)
    newMessagesSubscribers.forEach((callback: TNewMessagesSubscriber) => { callback(newMessages) } )
}

export const changeStatusHandler = (e: Event | CloseEvent) => { 
    
    let newStatus = (e.type === 'open') ? 'open' : 'close' as 'open' | 'close'

    changeStatusSubscribers.forEach((callback: TChangeStatusSubscriber) => { callback(newStatus) } )

    if(newStatus === 'close') {
        setTimeout(createChannel, 3000)
    }
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
    isReady() {
        return ws?.readyState === WebSocket.OPEN
    },
    subscribeNewMessages(callback: TNewMessagesSubscriber) {
        newMessagesSubscribers.push(callback)
    },
    unsubscribeNewMessages(callback: TNewMessagesSubscriber) {
        newMessagesSubscribers = newMessagesSubscribers.filter(s => s !== callback)
    },
    subscribeNewStatus(callback: TChangeStatusSubscriber) {
        changeStatusSubscribers.push(callback)
        return () => { changeStatusSubscribers = changeStatusSubscribers.filter(s => s !== callback) }
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}