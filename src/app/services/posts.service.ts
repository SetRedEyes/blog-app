import { IPost } from '../models/IPost'
import httpService from './http.service'
const postEndpoint = 'posts/'

const postsService = {
  fetchAll: async () => {
    const { data } = await httpService.get<IPost[]>(postEndpoint)
    return data
  },
  createPost: async (payload: IPost) => {
    const { data } = await httpService.post<IPost>(postEndpoint,payload)
    return data
  },
  removePost: async (id: IPost['id']) => {
    const { data } = await httpService.delete(postEndpoint + id)
    return data
  },
  updatePost: async (payload: IPost) => {
    const { data } = await httpService.patch(
      postEndpoint + payload.id,
      payload
    )
    return data
  }
}
export default postsService
