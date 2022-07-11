export interface ICommentProps {
  content: string
}
const Comment = ({ content }: ICommentProps) => {
  return (
    <div className='bg-light card-body mb-3'>
      <div className='mb-4'>
        <p className='small mb-0'>{content}</p>
      </div>
    </div>
  )
}

export default Comment
