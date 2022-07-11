export interface ISuccessTextProps {
  success: string
}

const SuccessText = ({ success }: ISuccessTextProps) => {
  if (success === '') return null
  return <small className='text-success'>{success}</small>
}

export default SuccessText
