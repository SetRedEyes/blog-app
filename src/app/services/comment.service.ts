import { ICommentClient } from './../models/IComment'
import httpService from './http.service'
import { IComment } from '../models/IComment'

const commentEndpoint = 'comments/'
const postEndpoint = 'posts/'
const commentService = {
  createComment: async (payload: ICommentClient) => {
    const { data } = await httpService.post(commentEndpoint, payload)
    return data
  },
  getComments: async (postId: IComment['postId']) => {
    const { data } = await httpService.get(postEndpoint+postId, {
      params: {
        _embed: 'comments'
      }
    })
    return data
  }
}
export default commentService