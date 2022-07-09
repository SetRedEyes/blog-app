import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  getPosts,
  getPostsLoadingStatus,
  loadPostsList
} from '../store/reducers/posts'
import LoadingSpinner from './loadingSpinner'

const PostsDesk = () => {
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector(getPosts())

  useEffect(() => {
    dispatch(loadPostsList())
  }, [])
  const postsLoading = useAppSelector(getPostsLoadingStatus())

  if (postsLoading) {
    return <LoadingSpinner>Loading posts...</LoadingSpinner>
  }
  return (
    <Container className='d-flex mt-4 justify-content-center flex-column'>
      {!posts.length && (
        <p>
          There are no posts yet, you should <Link to='/edit'>create</Link> one
          😊.
        </p>
      )}
      {posts.map((post) => (
        <p key={post.id}>
          {post.id} {post.title} {post.body}
        </p>
      ))}
    </Container>
  )
}

export default PostsDesk
