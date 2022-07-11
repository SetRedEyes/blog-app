import React, { useState } from 'react'
import { Button, Form } from 'reactstrap'
import TextAreaField from '../form/textAreaField'
import { validator } from '../../utils/validator'

export interface IAddCommentFormProps {
  onSubmit: (param1: { [key: string]: string }) => void
}

const AddCommentForm = ({ onSubmit }: IAddCommentFormProps) => {
  const [data, setData] = useState({ body: '' })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (target: { name: string; value: string }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    body: { isRequired: { message: 'Comment is required' } }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const clearForm = () => {
    setData({ body: '' })
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
      <h2>Add New comment</h2>
      <Form onSubmit={handleSubmit}>
        <TextAreaField
          value={data.body}
          onChange={handleChange}
          name='body'
          error={errors.body}
        />
        <div className='d-flex justify-content-end'>
          <Button color='primary'>Post comment</Button>
        </div>
      </Form>
    </div>
  )
}

export default AddCommentForm
