import { CardBody } from "reactstrap"

export interface ICommentProps {
  content: string
}
const Comment = ({ content }: ICommentProps) => {
  return (
    <CardBody className='bg-light mb-3'>
        <p className='small mb-0'>{content}</p>
    </CardBody>
  )
}

export default Comment
