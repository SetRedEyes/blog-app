import { Link } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  Nav,
  Container,
  Button,
  NavbarText
} from 'reactstrap'


const Navigation = () => {
  return (
    <Navbar color='light' light sticky='top' expand='md' className='p-1'>
      <Container className='d-flex'>
        <NavbarBrand tag={Link} to='/'>
          📝 Home
        </NavbarBrand>
        <Nav className='me-auto' navbar />
        <div>
          <Button outline tag={Link} to='/edit'>
            Create a Post
          </Button>
          <NavbarText className='ms-3 me-3'>|</NavbarText>
          Also visit my Github Profile
          <Button outline size='sm' className='ms-3'>
            <a
              style={{ color: 'black' }}
              target='_blank'
              rel='noreferrer'
              href='https://github.com/SetRedEyes'
            >
              <i className='fa-brands fa-2x fa-github '></i>
            </a>
          </Button>
        </div>
      </Container>
    </Navbar>
  )
}

export default Navigation
