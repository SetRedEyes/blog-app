import { useParams } from 'react-router-dom'
import { Container } from 'reactstrap'
import Header from '../components/header'
import Navigation from '../components/navigation'
import PostsDesk from '../components/posts/postsDesk'
import PostPage from '../pages/postPage'

const Home = () => {
  const params = useParams()
  const { postId } = params

  return (
    <Container fluid className='p-0'>
      <Navigation />
      <Header
        title='SetRedEyes Blog Website'
        headline='Improvise, Adapt, Overcome'
      />
      {postId ? <PostPage postId={postId} /> : <PostsDesk/>}
    </Container>
  )
}

export default Home
