import { AppDispatch, RootState } from './../store'
import { createAction, createSlice } from '@reduxjs/toolkit'
import { IComment, ICommentClient } from '../../models/IComment'
import commentService from '../../services/comment.service'
import { checkErrorMessageType } from '../../utils/checkErrorMessageType'

interface CommentsState {
  comments: IComment[]
  isLoading: boolean
  error: string | null
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null
}
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsRecieved: (state, action) => {
      state.comments = action.payload
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated: (state, action) => {
      state.comments.push(action.payload)
    }
  }
})

const { actions, reducer: commentsReducer } = commentsSlice
const {
  commentsRecieved,
  commentsRequestFailed,
  commentsRequested,
  commentCreated
} = actions

const addCommentRequested = createAction('comments/addCommentRequested')

export const loadCommentsList =
  (postId: any) => async (dispatch: AppDispatch) => {
    dispatch(commentsRequested())
    try {
      const { comments } = await commentService.getComments(postId)

      dispatch(commentsRecieved(comments))
    } catch (error) {
      dispatch(commentsRequestFailed(checkErrorMessageType(error)))
    }
  }

export const createComment =
  (payload: ICommentClient) => async (dispatch: AppDispatch) => {
    dispatch(addCommentRequested())

    try {
      const data = await commentService.createComment(payload)

      dispatch(commentCreated(data))
    } catch (error) {
      dispatch(commentsRequestFailed(checkErrorMessageType(error)))
    }
  }

export const getComments = () => (state: RootState) => state.comments.comments
export const getCommentsLoadingStatus = () => (state: RootState) =>
  state.comments.isLoading

export default commentsReducer
