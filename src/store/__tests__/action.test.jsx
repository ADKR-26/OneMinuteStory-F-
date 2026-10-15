import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import * as actions from '../action'
import * as types from '../action-types'

vi.mock('axios', () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}))

const API = 'http://api.test'

// Thunks don't return their promise, so let the .then/.catch chain settle
const flush = () => new Promise((resolve) => setTimeout(resolve, 0))

const run = async (thunk) => {
  const dispatch = vi.fn()
  thunk(dispatch)
  await flush()
  return dispatch
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

describe('plain action creators', () => {
  it.each([
    [actions.actionGetStoryData, types.GET_STORY_DATA],
    [actions.actionSetStoryData, types.SET_STORY_DATA],
    [actions.actionSetGeneratedStory, types.GENERATE_STORY_DATA],
    [actions.actionDeleteStoryData, types.DELETE_STORY_DATA],
    [actions.actionSignUpUser, types.SIGN_UP],
    [actions.actionSignInUser, types.SIGN_IN],
    [actions.actionSignInUserGoogle, types.SIGN_IN_GOOGLE],
    [actions.actionSignUpUserGoogle, types.SIGN_UP_GOOGLE],
    [actions.actionUpdateUserError, types.UPDATE_USER_ERROR],
    [actions.actionSignOut, types.SIGNOUT_USER],
    [actions.actionDeleteUserData, types.DELETE_USER],
    [actions.actionSetTitleId, types.SET_TITLE_ID],
  ])('%p returns type %s with payload', (creator, type) => {
    expect(creator('payload')).toEqual({ type, payload: 'payload' })
  })

  it('actionUpdateUser carries the updateError flag', () => {
    expect(actions.actionUpdateUser({ id: 1 }, true)).toEqual({
      type: types.UPDATE_USER,
      payload: { id: 1 },
      updateError: true,
    })
  })

  it('signUpUserRequest / Success / Failure build the expected actions', () => {
    expect(actions.signUpUserRequest()).toEqual({ type: types.SIGN_UP_USER_REQUEST })
    expect(actions.signUpUserSuccess({ id: 1 })).toEqual({
      type: types.SIGN_UP_USER_SUCCESS,
      payload: { id: 1 },
    })
    expect(actions.signUpUserFailure('err')).toEqual({
      type: types.SIGN_UP_USER_FAILURE,
      payload: 'err',
    })
  })
})

describe('getStoryData', () => {
  it('fetches stories and dispatches them', async () => {
    const stories = [{ _id: '1' }]
    axios.get.mockResolvedValue({ data: stories })

    const dispatch = await run(actions.getStoryData())

    expect(axios.get).toHaveBeenCalledWith(`${API}/api/getStoryData`)
    expect(dispatch).toHaveBeenCalledWith({ type: types.GET_STORY_DATA, payload: stories })
  })

  it('dispatches the error response on failure', async () => {
    const error = { response: { status: 500 } }
    axios.get.mockRejectedValue(error)

    const dispatch = await run(actions.getStoryData())

    expect(dispatch).toHaveBeenCalledWith({ type: types.GET_STORY_DATA, payload: error.response })
  })
})

describe('setStoryData', () => {
  it('posts the story in the expected shape and dispatches the response', async () => {
    const response = { data: { ok: true } }
    axios.post.mockResolvedValue(response)

    const dispatch = await run(actions.setStoryData('Title', 'Once upon', 'a@b.com', 'alice'))

    expect(axios.post).toHaveBeenCalledWith(`${API}/api/addStory`, {
      title: 'Title',
      scenes: [{ content: 'Once upon', author: { userName: 'alice' } }],
      creatorEmail: 'a@b.com',
      creatorName: 'alice',
    })
    expect(dispatch).toHaveBeenCalledWith({ type: types.SET_STORY_DATA, payload: response })
  })

  it('dispatches the error response on failure', async () => {
    const error = { response: { status: 400 } }
    axios.post.mockRejectedValue(error)

    const dispatch = await run(actions.setStoryData('t', 's', 'e', 'u'))

    expect(dispatch).toHaveBeenCalledWith({ type: types.SET_STORY_DATA, payload: error.response })
  })
})

describe('generateStoryData', () => {
  it('posts the story and dispatches the generated result', async () => {
    const response = { data: { generatedStoryData: 'text' } }
    axios.post.mockResolvedValue(response)

    const dispatch = await run(actions.generateStoryData('prompt'))

    expect(axios.post).toHaveBeenCalledWith(`${API}/api/generateStory`, { story: 'prompt' })
    expect(dispatch).toHaveBeenCalledWith({ type: types.GENERATE_STORY_DATA, payload: response })
  })

  it('dispatches the error response on failure', async () => {
    const error = { response: { status: 500 } }
    axios.post.mockRejectedValue(error)

    const dispatch = await run(actions.generateStoryData('prompt'))

    expect(dispatch).toHaveBeenCalledWith({ type: types.GENERATE_STORY_DATA, payload: error.response })
  })
})

describe('generateCoverImage', () => {
  it('posts data and storyId and resolves with response data', async () => {
    axios.post.mockResolvedValue({ data: { url: 'img.png' } })

    const result = await actions.generateCoverImage(['scene'], 'story-1')

    expect(axios.post).toHaveBeenCalledWith(`${API}/api/generateCoverImage`, {
      story: { data: ['scene'], storyId: 'story-1' },
    })
    expect(result).toEqual({ url: 'img.png' })
  })

  it('resolves to undefined when the request fails', async () => {
    axios.post.mockRejectedValue(new Error('network'))

    await expect(actions.generateCoverImage([], 'id')).resolves.toBeUndefined()
  })
})

describe('getCoverImage', () => {
  it('requests the cover image for a story and resolves with its data', async () => {
    axios.get.mockResolvedValue({ data: { url: 'cover.png' } })

    const result = await actions.getCoverImage('story-9')

    expect(axios.get).toHaveBeenCalledWith(`${API}/api/getCoverImage?storyId=story-9`)
    expect(result).toEqual({ url: 'cover.png' })
  })

  it('rethrows the error when the request fails', async () => {
    const error = new Error('404')
    axios.get.mockRejectedValue(error)

    await expect(actions.getCoverImage('x')).rejects.toBe(error)
  })
})

describe('deleteStoryData', () => {
  it('deletes by id, dispatches the deleted story and refetches stories', async () => {
    axios.delete.mockResolvedValue({ data: { deletedStory: { _id: '7' } } })

    const dispatch = await run(actions.deleteStoryData('7'))

    expect(axios.delete).toHaveBeenCalledWith(`${API}/api/deleteStory/7`)
    expect(dispatch).toHaveBeenCalledWith({ type: types.DELETE_STORY_DATA, payload: { _id: '7' } })
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function))
  })

  it('dispatches the error response on failure without refetching', async () => {
    const error = { response: { status: 404 } }
    axios.delete.mockRejectedValue(error)

    const dispatch = await run(actions.deleteStoryData('7'))

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith({ type: types.DELETE_STORY_DATA, payload: error.response })
  })
})

describe('likeStory', () => {
  it('posts the email for the story and refetches stories', async () => {
    axios.post.mockResolvedValue({ data: {} })

    const dispatch = await run(actions.likeStory('story-1', 'a@b.com'))

    expect(axios.post).toHaveBeenCalledWith(`${API}/api/likedBy/story-1`, { email: 'a@b.com' })
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function))
  })

  it('dispatches nothing on failure', async () => {
    axios.post.mockRejectedValue(new Error('boom'))

    const dispatch = await run(actions.likeStory('story-1', 'a@b.com'))

    expect(dispatch).not.toHaveBeenCalled()
  })
})

describe('signInUser', () => {
  it('posts credentials and dispatches the response', async () => {
    const response = { data: { email: 'a@b.com' } }
    axios.post.mockResolvedValue(response)

    const dispatch = await run(actions.signInUser('a@b.com', 'pw'))

    expect(axios.post).toHaveBeenCalledWith(`${API}/OMS-api/auth/signin`, {
      email: 'a@b.com',
      password: 'pw',
      googleUsed: false,
    })
    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGN_IN, payload: response })
  })

  it('dispatches the error response and a sign-up failure flag on failure', async () => {
    const error = { response: { status: 401 } }
    axios.post.mockRejectedValue(error)

    const dispatch = await run(actions.signInUser('a@b.com', 'bad'))

    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGN_IN, payload: error.response })
    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGN_UP_USER_FAILURE, payload: true })
  })
})

describe('signUpUser', () => {
  it('dispatches request, then success with the response body', async () => {
    const response = { data: { id: 1 } }
    axios.post.mockResolvedValue(response)

    const dispatch = await run(actions.signUpUser('alice', 'a@b.com', 'pw'))

    expect(axios.post).toHaveBeenCalledWith(`${API}/OMS-api/auth/signup`, {
      username: 'alice',
      email: 'a@b.com',
      password: 'pw',
      googleUsed: false,
    })
    expect(dispatch.mock.calls[0][0]).toEqual({ type: types.SIGN_UP_USER_REQUEST })
    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGN_UP, payload: response })
    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGN_UP_USER_SUCCESS, payload: { id: 1 } })
  })

  it('dispatches request, then failure on error', async () => {
    const error = { response: { status: 409 } }
    axios.post.mockRejectedValue(error)

    const dispatch = await run(actions.signUpUser('alice', 'a@b.com', 'pw'))

    expect(dispatch.mock.calls[0][0]).toEqual({ type: types.SIGN_UP_USER_REQUEST })
    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGN_UP, payload: error.response })
    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGN_UP_USER_FAILURE, payload: error })
  })
})

describe('signInUserGoogle', () => {
  it('posts email and googleUsed and dispatches the response', async () => {
    const response = { data: {} }
    axios.post.mockResolvedValue(response)

    const dispatch = await run(actions.signInUserGoogle('g@x.com', true))

    expect(axios.post).toHaveBeenCalledWith(`${API}/OMS-api/auth/google`, {
      email: 'g@x.com',
      googleUsed: true,
    })
    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGN_IN_GOOGLE, payload: response })
  })

  it('dispatches the error response on failure', async () => {
    const error = { response: { status: 500 } }
    axios.post.mockRejectedValue(error)

    const dispatch = await run(actions.signInUserGoogle('g@x.com', true))

    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGN_IN_GOOGLE, payload: error.response })
  })
})

describe('signUpUserGoogle', () => {
  it('converts the photo to a string before posting', async () => {
    axios.post.mockResolvedValue({ data: {} })

    await run(actions.signUpUserGoogle('Alice', 'g@x.com', 12345, true))

    expect(axios.post).toHaveBeenCalledWith(`${API}/OMS-api/auth/google`, {
      name: 'Alice',
      email: 'g@x.com',
      photo: '12345',
      googleUsed: true,
    })
  })

  it('dispatches the error response on failure', async () => {
    const error = { response: { status: 500 } }
    axios.post.mockRejectedValue(error)

    const dispatch = await run(actions.signUpUserGoogle('A', 'g@x.com', 'p', true))

    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGN_UP_GOOGLE, payload: error.response })
  })
})

describe('updateUser', () => {
  it('posts to the user id, dispatches success with updateError false, and refetches stories', async () => {
    const response = { data: { id: 'u1' } }
    axios.post.mockResolvedValue(response)

    const dispatch = await run(actions.updateUser('alice', 'a@b.com', 'pic', 'pw', 'u1'))

    expect(axios.post).toHaveBeenCalledWith(`${API}/OMS-api/user/update/u1`, {
      username: 'alice',
      email: 'a@b.com',
      profilePicture: 'pic',
      password: 'pw',
    })
    expect(dispatch).toHaveBeenCalledWith({
      type: types.UPDATE_USER,
      payload: response,
      updateError: false,
    })
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function))
  })

  it('dispatches updateError true on failure', async () => {
    axios.post.mockRejectedValue(new Error('fail'))

    const dispatch = await run(actions.updateUser('a', 'b', 'c', 'd', 'u1'))

    expect(dispatch).toHaveBeenCalledWith({ type: types.UPDATE_USER_ERROR, payload: true })
  })
})

describe('deleteUser', () => {
  it('deletes by id and dispatches the response', async () => {
    const response = { status: 200 }
    axios.delete.mockResolvedValue(response)

    const dispatch = await run(actions.deleteUser('u1'))

    expect(axios.delete).toHaveBeenCalledWith(`${API}/OMS-api/user/delete/u1`)
    expect(dispatch).toHaveBeenCalledWith({ type: types.DELETE_USER, payload: response })
  })

  it('dispatches the error response on failure', async () => {
    const error = { response: { status: 404 } }
    axios.delete.mockRejectedValue(error)

    const dispatch = await run(actions.deleteUser('u1'))

    expect(dispatch).toHaveBeenCalledWith({ type: types.DELETE_USER, payload: error.response })
  })
})

describe('signOutUser', () => {
  it('calls signout and dispatches the response', async () => {
    const response = { status: 200 }
    axios.get.mockResolvedValue(response)

    const dispatch = await run(actions.signOutUser())

    expect(axios.get).toHaveBeenCalledWith(`${API}/OMS-api/auth/signout`)
    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGNOUT_USER, payload: response })
  })

  it('dispatches the error response on failure', async () => {
    const error = { response: { status: 500 } }
    axios.get.mockRejectedValue(error)

    const dispatch = await run(actions.signOutUser())

    expect(dispatch).toHaveBeenCalledWith({ type: types.SIGNOUT_USER, payload: error.response })
  })
})
