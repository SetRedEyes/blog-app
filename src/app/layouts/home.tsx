import { useParams } from 'react-router-dom'
import MainPage from '../pages/mainPage'
import PostPage from '../pages/postPage'

const Home = () => {
  const params = useParams()
  const { postId } = params

  return <>{postId ? <PostPage postId={postId} /> : <MainPage />}</>
}

export default Home
