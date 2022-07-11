import Comment from './comment'
import { IComment } from '../../models/IComment'

export interface ICommentsListProps {
  comments: IComment[]
}

const CommentsList = ({ comments }: ICommentsListProps) => {
  return (
    <>
      {comments.map((comment: any) => (
        <Comment key={comment.id} content={comment.body} />
      ))}
    </>
  )
}

export default CommentsList
