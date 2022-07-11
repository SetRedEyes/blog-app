import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  getPostById,
  createPost,
  updatePostData,
  getPostsLoadingStatus,
  getNewPostId
} from '../store/reducers/posts'
import { Button, Container, Form, FormGroup } from 'reactstrap'
import Header from '../components/header'
import Navigation from '../components/navigation'
import SuccessText from '../components/successText'
import { Link } from 'react-router-dom'
import TextField from '../components/form/textField'
import { validator } from '../utils/validator'
import TextAreaField from '../components/form/textAreaField'

const EditPage = () => {
  const postId = useParams().postId
  const [data, setData] = useState({
    title: '',
    body: ''
  })

  const dispatch = useAppDispatch()
  const post = useAppSelector(getPostById(Number(postId)))
  const postsLoading = useAppSelector(getPostsLoadingStatus())
  const newPostId = useAppSelector(getNewPostId())

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState('')
  const [isCreated, setCreated] = useState(false)

  useEffect(() => {
    if (!postsLoading && postId && post) {
      setData({ ...post })
    }
  }, [])

  const handleChange = (target: { name: string; value: string }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    title: {
      isRequired: {
        message: 'Title is required'
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validate()
  }, [data])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    if (postId) {
      dispatch(updatePostData({ ...data, id: Number(postId) }))
      setSuccess('Blog updated!')
    } else {
      dispatch(createPost(data))
      setCreated(true)
      setSuccess('Post created. You can continue to edit it on this page.')
    }
  }
  const isValid = Object.keys(errors).length !== 0

  return (
    <Container fluid className='p-0'>
      <Navigation />
      <Header
        headline=''
        title={postId || isCreated ? 'Edit your post' : 'Create a new post'}
      ></Header>
      <Container className='mt-5 mb-5'>
        <Form onSubmit={handleSubmit}>
          <TextField
            label='Title *'
            value={data.title}
            name='title'
            placeholder='Enter a title...'
            onChange={handleChange}
            error={errors.title}
          />
          <TextAreaField
            value={data.body}
            onChange={handleChange}
            name='body'
            label='Content'
            error={errors.content}
          />
          <FormGroup>
            <SuccessText success={success} />
          </FormGroup>
          <Button block className='mb-2' disabled={isValid}>
            <i className='fas fa-save mr-1' />
            {postId || isCreated ? ' Update' : ' Create'}
          </Button>
        </Form>
        {(postId || isCreated) && (
          <Button
            block
            color='success'
            tag={Link}
            to={`/post/${postId ?? newPostId}`}
          >
            View your post!
          </Button>
        )}
      </Container>
    </Container>
  )
}
export default EditPage
