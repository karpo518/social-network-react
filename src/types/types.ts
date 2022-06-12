

// Тип для подстановки в качестве типа значений из другого типа-объекта 
export type TValueOf<T> = T[keyof T]

// Специальный тип, который проверяет, равно ли значение ключу или строке вида `ключ.значение` из типа ObjectType 
export type NestedKeyOf<ObjectType extends object> = {
[Key in keyof ObjectType & string ]: ObjectType[Key] extends object 
? `${Key}.${keyof ObjectType[Key] & string}`
: `${Key}`
}[keyof ObjectType & string];

export type TPost = {
    id: number
    message: string
    likesCount: number
}

export type TPhotos = {
    small: string | null 
    large: string | null
}

export type TContacts = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type TProfile = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: TContacts
    photos: TPhotos
    aboutMe?: string
}
export type TUser = {
    id: number
    name: string
    photos: TPhotos
    status: string | null
    followed: boolean
    uniqueUrlName: string | null
}

export type TFriend =
{
    id: number
    name: string
    image: string
}

export type TMessage = {
    id: string
    senderId: number
    senderName: string,
    recipientId:number
    body: string
    translatedBody: string | null
    addedAt: string
    viewed: boolean
}

export type TNewMessage = {
    deletedBySender: boolean
    deletedByRecipient: boolean
    isSpam: boolean
    distributionId: any
}

export type TDialog = {
    id: number
    userName: string
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number
    photos: {small: string | null, large: string | null}
}

