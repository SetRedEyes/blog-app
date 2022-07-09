import axios from 'axios'
import config from '../config.json'

const http = axios.create({
  baseURL: config.apiEndpoint
})

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
}

export default httpService
