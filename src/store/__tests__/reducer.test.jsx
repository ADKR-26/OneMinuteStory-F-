import { describe, it, expect } from 'vitest'
import storyReducer from '../reducer'
import * as types from '../action-types'

const initialState = {
  storyData: [],
  addedStory: {},
  deletedStory: {},
  titleId: null,
  currentUser: null,
  loading: false,
  error: false,
  user: null,
  updateError: false,
  generatedStory: {},
}

describe('storyReducer', () => {
  it('returns the initial state when called with undefined state', () => {
    expect(storyReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('returns the same state for an unknown action', () => {
    const state = { ...initialState, titleId: 'abc' }
    expect(storyReducer(state, { type: 'UNKNOWN' })).toBe(state)
  })

  it('GET_STORY_DATA sets storyData', () => {
    const stories = [{ _id: '1', title: 'One' }]
    const next = storyReducer(undefined, { type: types.GET_STORY_DATA, payload: stories })
    expect(next.storyData).toEqual(stories)
  })

  it('SET_STORY_DATA sets addedStory', () => {
    const next = storyReducer(undefined, { type: types.SET_STORY_DATA, payload: { title: 'New' } })
    expect(next.addedStory).toEqual({ title: 'New' })
  })

  it('GENERATE_STORY_DATA sets generatedStory', () => {
    const next = storyReducer(undefined, { type: types.GENERATE_STORY_DATA, payload: { story: 'text' } })
    expect(next.generatedStory).toEqual({ story: 'text' })
  })

  it('DELETE_STORY_DATA sets deletedStory', () => {
    const next = storyReducer(undefined, { type: types.DELETE_STORY_DATA, payload: { ok: true } })
    expect(next.deletedStory).toEqual({ ok: true })
  })

  it('SET_TITLE_ID sets titleId', () => {
    const next = storyReducer(undefined, { type: types.SET_TITLE_ID, payload: 'story-42' })
    expect(next.titleId).toBe('story-42')
  })

  it('UPDATE_USER sets currentUser and updateError', () => {
    const next = storyReducer(undefined, {
      type: types.UPDATE_USER,
      payload: { email: 'a@b.com' },
      updateError: false,
    })
    expect(next.currentUser).toEqual({ email: 'a@b.com' })
    expect(next.updateError).toBe(false)
  })

  it('UPDATE_USER_ERROR sets updateError', () => {
    const next = storyReducer(undefined, { type: types.UPDATE_USER_ERROR, payload: 'bad' })
    expect(next.updateError).toBe('bad')
  })

  it('DELETE_USER clears currentUser', () => {
    const state = { ...initialState, currentUser: { email: 'a@b.com' } }
    expect(storyReducer(state, { type: types.DELETE_USER }).currentUser).toBeNull()
  })

  it('SIGN_IN sets currentUser', () => {
    const next = storyReducer(undefined, { type: types.SIGN_IN, payload: { email: 'a@b.com' } })
    expect(next.currentUser).toEqual({ email: 'a@b.com' })
  })

  it('SIGNOUT_USER clears currentUser', () => {
    const state = { ...initialState, currentUser: { email: 'a@b.com' } }
    expect(storyReducer(state, { type: types.SIGNOUT_USER }).currentUser).toBeNull()
  })

  it('SIGN_IN_GOOGLE sets currentUser', () => {
    const next = storyReducer(undefined, { type: types.SIGN_IN_GOOGLE, payload: { email: 'g@x.com' } })
    expect(next.currentUser).toEqual({ email: 'g@x.com' })
  })

  it('SIGN_UP_GOOGLE sets currentUser', () => {
    const next = storyReducer(undefined, { type: types.SIGN_UP_GOOGLE, payload: { email: 'g@x.com' } })
    expect(next.currentUser).toEqual({ email: 'g@x.com' })
  })

  it('SIGN_UP_USER_REQUEST sets loading and clears error and user', () => {
    const state = { ...initialState, error: 'old', user: { id: 1 } }
    const next = storyReducer(state, { type: types.SIGN_UP_USER_REQUEST })
    expect(next).toMatchObject({ loading: true, error: null, user: null })
  })

  it('SIGN_UP_USER_SUCCESS stores the new user and clears loading', () => {
    const state = { ...initialState, loading: true }
    const next = storyReducer(state, { type: types.SIGN_UP_USER_SUCCESS, payload: { id: 1 } })
    expect(next).toMatchObject({ loading: false, error: null, user: { id: 1 } })
  })

  it('SIGN_UP_USER_FAILURE stores the error and clears user', () => {
    const state = { ...initialState, loading: true, user: { id: 1 } }
    const next = storyReducer(state, { type: types.SIGN_UP_USER_FAILURE, payload: 'taken' })
    expect(next).toMatchObject({ loading: false, error: 'taken', user: null })
  })

  it('does not mutate the previous state', () => {
    const state = Object.freeze({ ...initialState, storyData: [] })
    expect(() => storyReducer(state, { type: types.GET_STORY_DATA, payload: [1] })).not.toThrow()
    expect(state.storyData).toEqual([])
  })
})
