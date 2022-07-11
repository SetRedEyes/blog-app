import { RootState } from './../store'
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPost, IPostClient } from '../../models/IPost'
import { AppDispatch } from '../store'
import { checkErrorMessageType } from '../../utils/checkErrorMessageType'
import postsService from '../../services/posts.service'

interface PostsState {
  posts: IPost[]
  isLoading: boolean
  error: string | null
  newPostId: number | null
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
  newPostId: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsRequested: (state) => {
      state.isLoading = true
    },
    postsRecieved: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload
      state.isLoading = false
    },
    postsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    postCreated: (state, action) => {
      state.posts.push(action.payload)
      state.newPostId = action.payload.id
    },
    postRemoved: (state, action) => {
      state.posts = state.posts.filter((c) => c.id !== action.payload)
    },
    postUpdated: (state, action) => {
      state.posts[state.posts.findIndex((p) => p.id === action.payload.id)] =
        action.payload
    }
  }
})

const { reducer: postsReducer, actions } = postsSlice

const {
  postsRequested,
  postsRecieved,
  postsRequestFailed,
  postCreated,
  postRemoved,
  postUpdated
} = actions

const addPostRequested = createAction('posts/addPostRequested')
const removePostRequested = createAction('posts/removePostRequested')
const postUpdateRequested = createAction('posts/postUpdateRequested')

export const loadPostsList = () => async (dispatch: AppDispatch) => {
  dispatch(postsRequested())

  try {
    const data = await postsService.fetchAll()
    dispatch(postsRecieved(data))
  } catch (error) {
    dispatch(postsRequestFailed(checkErrorMessageType(error)))
  }
}

export const createPost =
  (payload: IPostClient) => async (dispatch: AppDispatch) => {
    dispatch(addPostRequested())
    try {
      const data = await postsService.createPost(payload)

      dispatch(postCreated(data))
    } catch (error) {
      dispatch(postsRequestFailed(checkErrorMessageType(error)))
    }
  }

export const updatePostData =
  (payload: IPost) => async (dispatch: AppDispatch) => {
    dispatch(postUpdateRequested())
    try {
      const data = await postsService.updatePost(payload)
      dispatch(postUpdated(data))
      dispatch(loadPostsList())
    } catch (error) {
      dispatch(postsRequestFailed(checkErrorMessageType(error)))
    }
  }

export const removePost =
  (id: IPost['id']) => async (dispatch: AppDispatch) => {
    dispatch(removePostRequested())
    try {
      const data = await postsService.removePost(id)
      if (!data) {
        dispatch(postRemoved(id))
      }
    } catch (error) {
      dispatch(postsRequestFailed(checkErrorMessageType(error)))
    }
  }

export const getPosts = () => (state: RootState) => state.posts

export const getPostById = (id: any) => (state: RootState) => {
  if (state.posts.posts.length) {
    return state.posts.posts.find((p) => p.id === id)
  }
}

export const getNewPostId = () => (state: RootState) => {
  if (state.posts.posts.length) {
    return state.posts.newPostId
  }
}

export const getPostsLoadingStatus = () => (state: RootState) =>
  state.posts.isLoading
export default postsReducer
