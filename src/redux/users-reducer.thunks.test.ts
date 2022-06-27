import { AxiosResponse } from 'axios';
import { usersAPI } from './../api/users-api';
import { EResultCodes } from './../api/api';
import { follow, unfollow, usersAC, usersAT } from "./users-reducer"
import { TResponse } from '../api/api';

jest.mock('./../api/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

const result: AxiosResponse = {
  data: {
    resultCode: EResultCodes.Success,
    messages:[],
    data:{},
    fieldsErrors:[]
  },
  status: 200,
  statusText: '',
  headers: {},
  config: {}
}


test('follow thunk', async () => {
    const thunk = follow(1)

    usersAPIMock.follow.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)

    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersAC.toggleIsFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersAC.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersAC.toggleIsFollowingInProgress(false, 1))
})

test('unfollow thunk', async () => {
  const thunk = unfollow(1)

  usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)

  expect(dispatchMock).toHaveBeenNthCalledWith(1, usersAC.toggleIsFollowingInProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersAC.unfollowSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, usersAC.toggleIsFollowingInProgress(false, 1))
})


