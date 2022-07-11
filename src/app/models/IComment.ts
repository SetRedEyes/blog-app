export interface IComment {
  id: number
  postId: number
  body: string
}

export interface ICommentClient {
  postId: number
  body: string
}
