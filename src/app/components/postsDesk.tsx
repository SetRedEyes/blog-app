import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import {  useAppSelector } from '../hooks/redux'
import { getPosts, getPostsLoadingStatus } from '../store/reducers/posts'
import LoadingSpinner from './loadingSpinner'
import PostPreview from './postPreview'

const PostsDesk = () => {
  const { posts } = useAppSelector(getPosts())

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
        <React.Fragment key={post.id}>
          <PostPreview id={post.id} title={post.title} content={post.body} />
          <hr />
        </React.Fragment>
      ))}
    </Container>
  )
}

export default PostsDesk
