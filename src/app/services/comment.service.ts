import httpService from './http.service'
import {IComment} from '../models/IComment'

const commentEndpoint = 'comments/'

const commentService = {
  createComment: async (payload: IComment) => {
    const { data } = await httpService.post(commentEndpoint, payload)
    return data
  }
}
export default commentService
