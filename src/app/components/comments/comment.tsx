import { useAppSelector } from '../../hooks/redux'
import { getPostById } from '../../store/reducers/posts'

export interface ICommentProps {
  content: string
  postId:number
}
const Comment = ({ content, postId }:ICommentProps) => {
  const post = useAppSelector(getPostById(postId))
  return (
    <div className='bg-light card-body mb-3'>
      <div className='row'>
        <div className='col'>
          <div className='d-flex flex-start'>
            <div className='flex-grow-1 flex-shrink-1'>
              <div className='mb-4'>
                <p className='small mb-0'>{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Comment
