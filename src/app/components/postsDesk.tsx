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
import PostPreview from './postPreview'

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
    <Container className='mt-4'>
      {!posts.length && (
        <p>
          There are no posts yet, you should <Link to='/edit'>create</Link> one
          😊.
        </p>
      )}
      {posts.map((post) => (
        <>
        <PostPreview
          key={post.id}
          id={post.id}
          title={post.title}
          text={post.body}
        />
        <hr />
        </>
      ))}
    </Container>
  )
}

export default PostsDesk
