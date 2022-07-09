import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getPosts, loadPostsList } from '../store/reducers/posts'

const MainPage = () => {
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector(getPosts())

  useEffect(() => {
    dispatch(loadPostsList())
  }, [])

  return (
    <div>
      {posts.map((post) => (
        <p key={post.id}>
          {post.id} {post.title} {post.body}
        </p>
      ))}
    </div>
  )
}

export default MainPage
