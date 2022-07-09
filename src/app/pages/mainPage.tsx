import { Container } from 'reactstrap'
import Header from '../components/header'
import Navigation from '../components/navigation'
import PostsDesk from '../components/postsDesk'

const MainPage = () => {
  return (
    <Container fluid className='p-0'>
      <Navigation />
      <Header
        title='SetRedEyes Blog Website'
        headline='Improvise, Adapt, Overcome'
      />
      <PostsDesk />
    </Container>
  )
}

export default MainPage
