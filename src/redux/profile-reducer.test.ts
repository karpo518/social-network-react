import profileReducer, {profileAC} from "./profile-reducer";

let state = {
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



test('length of the posts should be increment', () => {

    let action  = profileAC.addPost('it-kamasutra.com')

    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5)

});

test('message of new post should be "it-kamasutra.com"', () => {

    let action  = profileAC.addPost('it-kamasutra.com')


    let newState = profileReducer(state, action)
    expect(newState.posts[4].message).toBe('it-kamasutra.com')

});

test('after deleting length of the posts should be decrement', () => {

    let action  = profileAC.deletePost(1)

    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3)

});

test('after deleting length of the posts should not be decrement if id not correct', () => {

    let action  = profileAC.deletePost(50)

    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)

});
