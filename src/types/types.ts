export type storeType = any

export type postType = {
    id: number;
    message: string;
    likesCount: number;
}

export type photosType = {
    small: string | null 
    large: string | null
}

export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type profileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
}
export type userType = {
    name: string
    id: number
    photos: photosType
    status: string | null
    followed: boolean
}