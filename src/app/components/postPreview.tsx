import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'

export interface IPostPreviewProps {
  id?: number
  title: string
  content: string
}

const PostPreview = ({ id, title, content }: IPostPreviewProps) => {
  return (
    <Card className='border-0 mb-4'>
      <CardBody className='p-0'>
        <Link
          to={`/post/${id}`}
          style={{ textDecoration: 'none' }}
          className='text-dark'
        >
          <h2>
            <strong>{title}</strong>
          </h2>
          {content}
        </Link>
      </CardBody>
    </Card>
  )
}

export default PostPreview
