import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from './reducers/comments'
import postsReducer from './reducers/posts'

export const store = configureStore({
  reducer: { posts: postsReducer,comments: commentsReducer}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
