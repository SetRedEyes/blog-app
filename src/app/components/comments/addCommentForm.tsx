import React, { useState } from 'react'

import TextAreaField from '../form/textAreaField'
import { validator } from '../../utils/validator'

export interface IAddCommentFormProps {
  onSubmit: (param1: { [key: string]: string }) => void
}

const AddCommentForm = ({ onSubmit }: IAddCommentFormProps) => {
  const [data, setData] = useState<{ [key: string]: string }>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const handleChange = (target: { name: string; value: string }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    body: { isRequired: { message: 'Сообщение не может быть пустым' } }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const clearForm = () => {
    setData({})
    setErrors({})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          value={data.body || ''}
          onChange={handleChange}
          name='body'
          label='Comment'
          error={errors.content}
        />
        <div className='d-flex justify-content-end'>
          <button className='btn btn-primary'>Опубликовать</button>
        </div>
      </form>
    </div>
  )
}



export default AddCommentForm
