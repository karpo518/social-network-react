import { reset } from 'redux-form';
import { PostType, PhotosType, ProfileType } from './../types/types';
import { EResultCodes, profileAPI } from "../api/api";
import { authAC} from "./auth-reducer";
import { AppStateType, InferValueTypes } from './redux-store';
import { ThunkAction } from 'redux-thunk';

const profileAT =
{
    ADD_POST: 'MY-APP/PROFILE/ADD-POST' as const,
    UPDATE_NEW_POST_TEXT: 'MY-APP/PROFILE/UPDATE-NEW-POST-TEXT' as const,
    SET_USER_PROFILE: 'MY-APP/PROFILE/SET_USER_PROFILE' as const,
    SET_STATUS: 'MY-APP/PROFILE/SET_STATUS' as const,
    SAVE_PHOTO_SUCCESS: 'MY-APP/PROFILE/SAVE_PHOTO_SUCCESS' as const,
    DELETE_POST: 'MY-APP/PROFILE/DELETE_POST' as const,
}

let initialState = {
    posts: [
        {'id': 1, 'message': 'Hi! How are you?', 'likesCount': 15}, 
        {'id': 2, 'message': 'It is my first post!', 'likesCount': 20}, 
        {'id': 3, 'message': 'It is great!', 'likesCount': 20}, 
        {'id': 4, 'message': 'LOL :D', 'likesCount': 20}, 
    ] as Array<PostType>,
    newPostText: 'it-kamasutra.com',
    profile: null as ProfileType | null,
    status: '' as string,
    

}

type initialStateType = typeof initialState


const profileReducer = (state: initialStateType = initialState, action: TProfileActions): initialStateType => {
    
    switch(action.type) {

        case profileAT.ADD_POST: {
            let newPostId = state.posts.length + 1;
            let newPost = {
                id: newPostId,
                message: action.newPostBody,
                likesCount: 0, 
            };

            return {
                ...state,
                newPostText: '',
                posts:[...state.posts, newPost],
            };
        }
        case profileAT.UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText:action.newText,
            };
        }

        case profileAT.SET_USER_PROFILE: {
            return {...state, profile: action.profile }
        }

        case profileAT.SET_STATUS: {
            return {...state, status: action.status }
        }

        case profileAT.SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos } as ProfileType }
        }

        case profileAT.DELETE_POST: {
            return {...state, posts: state.posts.filter(post => post.id !== action.postId) }
        }

        default:
            return state;

    }
};

export type TProfileActions = ReturnType<InferValueTypes<typeof profileAC | typeof authAC.showSubmitErrors>>

// action creators of profileReducer
export const profileAC = {
    addPost: (newPostBody: string) => ({type: profileAT.ADD_POST, newPostBody} as const),
    updateNewPostText: (text: string) => ({type: profileAT.UPDATE_NEW_POST_TEXT, newText: text} as const),
    setUserProfile: (profile: ProfileType) => ({type: profileAT.SET_USER_PROFILE, profile} as const),
    setStatus: (status: string) => ({type: profileAT.SET_STATUS, status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: profileAT.SAVE_PHOTO_SUCCESS, photos} as const),
    deletePost: (postId: number) => ({type: profileAT.DELETE_POST, postId} as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TProfileActions>
type SyncThunkType = ThunkAction<void, AppStateType, unknown, TProfileActions>

export const getUserProfile = (userId: number): ThunkType => {
    
    return async (dispatch: any) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(profileAC.setUserProfile(response.data));
    }
}

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch: any) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(profileAC.setStatus(response.data));
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch: any) => {
        let response = await profileAPI.updateStatus(status)
        if(response.data.resultCode === EResultCodes.Success) {
            dispatch(profileAC.setStatus(status));
        }
    }
}

export const savePhoto = (file: any): ThunkType => {
    return async (dispatch: any) => {
        let response = await profileAPI.savePhoto(file)
        if(response.data.resultCode === EResultCodes.Success && response.data.data.photos) {
            dispatch(profileAC.savePhotoSuccess(response.data.data.photos));
        }
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch: any, getState ) => {

        let userId = getState().auth.userId
        if(userId) {     
            let response = await profileAPI.saveProfile(profile)
            if(response.data.resultCode === EResultCodes.Success) {
                
                dispatch(getUserProfile(userId));
            }
            else {
                dispatch(
                authAC.showSubmitErrors('edit-profile', response.data.messages, response.data.fieldsErrors)
                );
                return Promise.reject(response.data.messages)
            }
        }
    }
}

export const sendPost = (newPostBody: string): SyncThunkType => {
    return (dispatch: any) => {
        dispatch(profileAC.addPost(newPostBody))
        dispatch(reset('ProfileAddPostForm'));
    }
}

export default profileReducer;