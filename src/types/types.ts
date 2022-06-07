export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type PhotosType = {
    small: string | null 
    large: string | null
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe?: string
}
export type UserType = {
    id: number
    name: string
    photos: PhotosType
    status: string | null
    followed: boolean
    uniqueUrlName: string | null
}

export type FriendType =
{
    id: number
    name: string
    image: string
}

export type MessageType = {
    id: string
    senderId: number
    senderName: string,
    recipientId:number
    body: string
    translatedBody: string | null
    addedAt: string
    viewed: boolean
}

export type NewMessageType = {
    deletedBySender: boolean
    deletedByRecipient: boolean
    isSpam: boolean
    distributionId: any
}

export type DialogType = {
    id: number
    userName: string
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number
    photos: {small: string | null, large: string | null}
}