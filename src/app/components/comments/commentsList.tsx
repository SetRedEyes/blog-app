import Comment from './comment'
import { IComment } from '../../models/IComment'

export interface ICommentsListProps {
  comments:any
}

const CommentsList = ({ comments }: ICommentsListProps) => {
  return comments.map((comment:any) => (
    <Comment key={comment.id} content={comment.body} postId={comment.postId} />
  ))
}

export default CommentsList
