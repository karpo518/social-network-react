import usersReducer, { friendsOnly, TUsersState, usersAC } from "./users-reducer"

let state: TUsersState

beforeEach(() => {
    state = {
        users: [{ id: 1, 
                  name: 'Test name', 
                  photos: {small: null,large: null},
                  status: 'Test status', 
                  followed: false, 
                  uniqueUrlName: 'https://test.test/url'},
                { id: 2, 
                  name: 'Else one user', 
                  photos: {small: null,large: null},
                  status: 'super status', 
                  followed: false, 
                  uniqueUrlName: 'https://ya.ru/url2'},
                { id: 3, 
                  name: 'Another user', 
                  photos: {small: null,large: null},
                  status: 'super status', 
                  followed: true, 
                  uniqueUrlName: 'https://ya.ru/url2'},
                { id: 4, 
                  name: 'New user', 
                  photos: {small: null,large: null},
                  status: 'super status', 
                  followed: true, 
                  uniqueUrlName: 'https://ya.ru/url2'},
            ],
        pageSize: 100,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [], // Array of user ids
        filter: {
          isFriend: friendsOnly.Any,
          term: '',
        }
    }
})

test('follow success', () =>{

    const newState = usersReducer(state, usersAC.followSuccess(2))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () =>{

    const newState = usersReducer(state, usersAC.unfollowSuccess(3))
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})