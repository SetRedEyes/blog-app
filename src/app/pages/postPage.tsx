import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getPostById, removePost } from '../store/reducers/posts'
import Comments from '../components/comments/comments'
import PostPreview from '../components/posts/postPreview'
import LoadingSpinner from '../components/loadingSpinner'
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap'

export interface PostPageProps {
  postId: string
}

const PostPage = ({ postId }: PostPageProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const post = useAppSelector(getPostById(Number(postId)))
  const [modal, setModal] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)

  const deleteBlog = async () => {
    dispatch(removePost(Number(postId)))
    setDeleting(true)
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  if (!post) {
    return <LoadingSpinner>Loading post...</LoadingSpinner>
  }
  return (
    <Container className='mt-5'>
      <Modal isOpen={modal}>
        <ModalHeader>Delete</ModalHeader>
        <ModalBody>
          {deleting ? (
            <LoadingSpinner>Deleting...</LoadingSpinner>
          ) : (
            'Are you sure you want to delete this blog?'
          )}
        </ModalBody>
        <ModalFooter>
          <Button color='danger' onClick={() => deleteBlog()}>
            Delete Permanently
          </Button>
          <Button color='secondary' onClick={() => setModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Container fluid className='p-0'>
        <Button
          color='success'
          className='me-2'
          tag={Link}
          to={`/edit/${postId}`}
        >
          <i className='fas fa-edit me-2'></i>Edit
        </Button>

        <Button color='danger' onClick={() => setModal(true)}>
          <i className='far fa-trash-alt me-2'></i>Delete
        </Button>
        <hr />
      </Container>
      <PostPreview id={post.id} title={post.title} content={post.body} />
      <Comments />
    </Container>
  )
}

export default PostPage
