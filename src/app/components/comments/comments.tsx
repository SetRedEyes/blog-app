import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useParams } from 'react-router-dom'
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from '../../store/reducers/comments'
import LoadingSpinner from '../loadingSpinner'
import AddCommentForm from './addCommentForm'
import CommentsList from './commentsList'
import { Card, CardBody } from 'reactstrap'

const Comments = () => {
  const postId = useParams().postId

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadCommentsList(postId))
  }, [postId])

  const isLoading = useAppSelector(getCommentsLoadingStatus())
  const comments = useAppSelector(getComments())
  const handleSubmit = (data: { [key: string]: string }) => {
    dispatch(createComment({ body: data.body, postId: Number(postId) }))
  }

  return (
    <>
      <Card className='mb-4 mt-5'>
        <CardBody>
          <AddCommentForm onSubmit={handleSubmit} />
        </CardBody>
      </Card>
      {comments && (
        <Card className=' mb-3'>
          <CardBody>
            <h2>Comments</h2>
            <hr />
            {!comments.length && <p>No comments yet...</p>}
            {!isLoading ? (
              <CommentsList comments={comments} />
            ) : (
              <LoadingSpinner>Loading comments...</LoadingSpinner>
            )}
          </CardBody>
        </Card>
      )}
    </>
  )
}

export default Comments
