import { reset } from "redux-form";
import { profileAPI } from "../api/api";
import { showSubmitErrors } from "./auth-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
        {'id': 1, 'message': 'Hi! How are you?', 'likesCount': 15}, 
        {'id': 2, 'message': 'It is my first post!', 'likesCount': 20}, 
        {'id': 3, 'message': 'It is great!', 'likesCount': 20}, 
        {'id': 4, 'message': 'LOL :D', 'likesCount': 20}, 
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: '',
    

};

const profileReducer = (state = initialState, action) => {
    
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
            return {...state, profile: {...state.profile, photos: action.photos } }
        }

        case DELETE_POST: {
            return {...state, posts: state.posts.filter(post => post.id !== action.postId) }
        }

        default:
            return state;

    }
};

export const addPost = (newPostBody) => ({type: ADD_POST, newPostBody});

export const updateNewPostText = (text) => 
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});
export const deletePost = (postId) => ({type: DELETE_POST, postId});

export const getUserProfile = (userId) => {
    
    console.log('Get user profile')
    
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(response.data));
    }
}

export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));

    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)

        if(response.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {

        let response = await profileAPI.savePhoto(file)

        console.log(response)
        if(response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }
}

export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        let userId = getState().auth.id     
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


export const sendPost = (newPostBody) => {
    return (dispatch) => {
        dispatch(addPost(newPostBody))
        dispatch(reset('ProfileAddPostForm'));
    }
}

export default profileReducer;