export interface IErrorTextProps {
  error: string
}

const ErrorText = ({ error }: IErrorTextProps) => {
  if (error === '') return null

  return <small className='text-danger'>{error}</small>
}

export default ErrorText
