import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {

    _state: {
        profilePage:{
            posts: [
                {'id': 1, 'message': 'Hi! How are you?', 'likesCount': 15}, 
                {'id': 2, 'message': 'It is my first post!', 'likesCount': 20}, 
                {'id': 3, 'message': 'It is great!', 'likesCount': 20}, 
                {'id': 4, 'message': 'LOL :D', 'likesCount': 20}, 
            ],
            newPostText: 'it-kamasutra.com',

        },
        dialogsPage: {

            dialogs: [
                { id: 1, name: "Dimyich", "image": "https://i.pinimg.com/originals/63/97/51/639751f479935519929d41df4994e0d4.jpg" },
                { id: 2, name: "Andrey",  "image": "https://lemanagement.se/wp-content/uploads/2017/12/1485175881mlkcl9q.jpg" },
                { id: 3, name: "Sveta",   "image": "https://cdn1.flamp.ru/e65b00bdb664b5db6b41e3ee3bfe1578.jpg" },
                { id: 4, name: "Sasha",   "image": "https://wallbox.ru/resize/1024x1024/wallpapers/main2/201710/148923624258c3f1127d0107.83973406.jpg" },
                { id: 5, name: "Victor",  "image": "https://www.bellazon.com/main/uploads/monthly_03_2014/post-20217-0-1446113692-29693_thumb.jpg" },
                { id: 6, name: "Valery",  "image": "https://ae04.alicdn.com/kf/Hb45ef853bcd04b44ad933690494f0328C.jpg" },
            ],

            messages: [
                { id: 1, message: "Hi!", isIncoming: 1, authorId: 4, authorImage: "https://cdn1.flamp.ru/e65b00bdb664b5db6b41e3ee3bfe1578.jpg"},
                { id: 2, message: "How is your project?", isIncoming: 1, authorId: 4, authorImage: "https://cdn1.flamp.ru/e65b00bdb664b5db6b41e3ee3bfe1578.jpg" },
                { id: 3, message: "Yoooo!!!", isIncoming: 0, authorId: 1, authorImage: "https://i.pinimg.com/originals/63/97/51/639751f479935519929d41df4994e0d4.jpg" },
                { id: 4, message: "Yoooo!!!", isIncoming: 1, authorId: 4, authorImage: "https://cdn1.flamp.ru/e65b00bdb664b5db6b41e3ee3bfe1578.jpg" },
                { id: 5, message: "Yoooo!!!", isIncoming: 0, authorId: 1, authorImage: "https://i.pinimg.com/originals/63/97/51/639751f479935519929d41df4994e0d4.jpg" },
            ],
            newMessageBody: 'default message text!!!',
        },
        sidebar: {
            friends: [
                { id: 2, name: "Andrey", "image": "https://lemanagement.se/wp-content/uploads/2017/12/1485175881mlkcl9q.jpg" },
                { id: 3, name: "Sveta", "image": "https://cdn1.flamp.ru/e65b00bdb664b5db6b41e3ee3bfe1578.jpg" },
                { id: 4, name: "Sasha", "image": "https://wallbox.ru/resize/1024x1024/wallpapers/main2/201710/148923624258c3f1127d0107.83973406.jpg" },
            ],
        }
    },

    _callSubscriber() {
        console.log('State changed!');
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {

        this._callSubscriber = observer;
    },

    dispatch(action) { // {type: ADD-POST}
        
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    },
};

// window.state = state;

export default store;
window.store = store;