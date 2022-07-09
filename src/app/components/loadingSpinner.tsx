import { Container, Spinner } from 'reactstrap'

export interface ILoadingSpinnerProps {
  children?: React.ReactNode
}

const LoadingSpinner = ({ children }: ILoadingSpinnerProps) => {
  return (
    <Container className='d-flex justify-content-center  mt-4'>
      <Spinner color='dark' type='grow'></Spinner>
      <h5 className='mt-1 ms-3'>{children}</h5>

    </Container>
  )
}

export default LoadingSpinner
