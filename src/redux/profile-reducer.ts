import { postType, profileType, photosType } from './../types/types';
import { reset } from "redux-form";
import { profileAPI } from "../api/api";
import { showSubmitErrors } from "./auth-reducer";

const ADD_POST = 'MY-APP/PROFILE/ADD-POST';
const UPDATE_NEW_POST_TEXT = 'MY-APP/PROFILE/UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'MY-APP/PROFILE/SET_USER_PROFILE';
const SET_STATUS = 'MY-APP/PROFILE/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'MY-APP/PROFILE/SAVE_PHOTO_SUCCESS';
const DELETE_POST = 'MY-APP/PROFILE/DELETE_POST';

let initialState = {
    posts: [
        {'id': 1, 'message': 'Hi! How are you?', 'likesCount': 15}, 
        {'id': 2, 'message': 'It is my first post!', 'likesCount': 20}, 
        {'id': 3, 'message': 'It is great!', 'likesCount': 20}, 
        {'id': 4, 'message': 'LOL :D', 'likesCount': 20}, 
    ] as Array<postType>,
    newPostText: 'it-kamasutra.com',
    profile: null as profileType | null,
    status: '' as string,
    

}

type initialStateType = typeof initialState


const profileReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    
    switch(action.type) {

        case ADD_POST: {
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
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText:action.newText,
            };
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile }
        }

        case SET_STATUS: {
            return {...state, status: action.status }
        }

        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos } as profileType }
        }

        case DELETE_POST: {
            return {...state, posts: state.posts.filter(post => post.id !== action.postId) }
        }

        default:
            return state;

    }
};

type addPostActionType = {
    type: typeof ADD_POST;
    newPostBody: string; 
}
type updateNewPostTextActionType = {
    type: typeof UPDATE_NEW_POST_TEXT;
    newText: string;
}
type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE;
    profile: profileType;
}
type setStatusActionType = {
    type: typeof SET_STATUS;
    status: string;
}
type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS;
    photos: photosType;
}
type deletePostActionType = {
    type: typeof DELETE_POST;
    postId: number;
}

export const addPost = (newPostBody: string): addPostActionType => ({type: ADD_POST, newPostBody});
export const updateNewPostText = (text: string): updateNewPostTextActionType => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfile = (profile: profileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status: string): setStatusActionType => ({type: SET_STATUS, status});
export const savePhotoSuccess = (photos: photosType): savePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});
export const deletePost = (postId: number): deletePostActionType => ({type: DELETE_POST, postId});

export const getUserProfile = (userId: number) => {
    
    return async (dispatch: any) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(response.data));
    }
}

export const getStatus = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
        let response = await profileAPI.updateStatus(status)
        if(response.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const savePhoto = (file: any) => {
    return async (dispatch: any) => {

        let response = await profileAPI.savePhoto(file)

        console.log(response)
        if(response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }
}

export const saveProfile = (profile: profileType) => {
    return async (dispatch: any, getState: any) => {
        let userId = getState().auth.userId     
        let response = await profileAPI.saveProfile(profile)
        if(response.data.resultCode === 0) {
            dispatch(getUserProfile(userId));
        }
        else {
            dispatch(
              showSubmitErrors('edit-profile', response.data.messages, response.data.fieldsErrors)
            );
            return Promise.reject(response.data.messages)
        }
    }
}

export const sendPost = (newPostBody: string) => {
    return (dispatch: any) => {
        dispatch(addPost(newPostBody))
        dispatch(reset('ProfileAddPostForm'));
    }
}

export default profileReducer;