import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

export interface PostPageProps {
  postId: string
}

const PostPage = ({ postId }: PostPageProps) => {
  return (
    <Button tag={Link} to={`/edit/${postId}`}>
      Edit
    </Button>
  )
}

export default PostPage
