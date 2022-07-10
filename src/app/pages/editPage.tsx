import { useEffect, useState } from 'react'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  getPostById,
  createPost,
  updatePostData,
  getPostsLoadingStatus
} from '../store/reducers/posts'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import LoadingSpinner from '../components/loadingSpinner'
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import Header from '../components/header'
import Navigation from '../components/navigation'
import ErrorText from '../components/errorText'
import { Editor } from 'react-draft-wysiwyg'
import SuccessText from '../components/successText'
import { Link } from 'react-router-dom'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const EditPage = () => {
  const postId = useParams().postId
  console.log(postId)

  const postsLoading = useAppSelector(getPostsLoadingStatus())
  const post = useAppSelector(getPostById(Number(postId)))

  const dispatch = useAppDispatch()

  const [data, setData] = useState({
    title: '',
    body: ''
  })

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  )

  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!postsLoading && post) {
      getPost()
    } else {
      setLoading(false)
    }
  }, [postId])

  const getPost = async () => {
    if (post) {
     console.log(data.body)

      setData({ body: post.body, title: post.title })
      const contentPost = htmlToDraft(post.body)
      const contentState = ContentState.createFromBlockArray(
        contentPost.contentBlocks
      )
      const _editorState = EditorState.createWithContent(contentState)
      setEditorState(_editorState)
    } else {
      setError(`Unable to retrieve post ${postId} `)
    }
    setLoading(false)
  }

  const addPost = async () => {
    if (data.title === '' || data.body === '') {
      setError('Pleace fill out all required forms.')
      setSuccess('')
      return null
    }

    setError('')
    setSuccess('')
    setSaving(true)
    await dispatch(createPost(data))
    setSuccess('Post created. You can continue to edit it on this page.')
    setSaving(false)
  }

  const editPost = async () => {
    if (data.title === '' || data.body === '') {
      setError('Pleace fill out all required forms.')
      setSuccess('')
      return null
    }

    setError('')
    setSuccess('')
    setSaving(true)
    await dispatch(updatePostData({ ...data, id: Number(postId) }))
    setSuccess('Blog updated!')
    setSaving(false)
  }

  if (loading || postsLoading) {
    return <LoadingSpinner>Loading editor...</LoadingSpinner>
  }
  return (
    <Container fluid className='p-0'>
      <Navigation />
      <Header
        headline=''
        title={postId ? 'Edit your post' : 'Create a new post'}
      ></Header>
      <Container className='mt-5 mb-5'>
        <ErrorText error={error} />
        <Form>
          <FormGroup>
            <Label for='title'>Title *</Label>
            <Input
              type='text'
              value={data.title}
              id='title'
              placeholder='Enter a title...'
              disabled={saving}
              onChange={(event) =>
                setData({ ...data, title: event.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for='title'>Content</Label>
            <Editor
              editorState={editorState}
              wrapperClassName='card'
              editorClassName='card-body'
              onEditorStateChange={(newState) => {
                setEditorState(newState)
                setData({
                  ...data,
                  body: draftToHtml(convertToRaw(newState.getCurrentContent())).replace(/<[^>]+>/g, '')
                })
              }}
              toolbar={{
                options: [
                  'inline',
                  'blockType',
                  'fontSize',
                  'list',
                  'textAlign',
                  'history',
                  'embedded',
                  'emoji',
                  'image'
                ],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true }
              }}
            />
          </FormGroup>
          <FormGroup>
            <SuccessText success={success} />
          </FormGroup>
          <FormGroup>
            <Button
              className='mb-2'
              block
              onClick={() => {
                postId ? editPost() : addPost()
              }}
              disabled={saving}
            >
              <i className='fas fa-save mr-1' />
              {postId ? ' Update' : ' Create'}
            </Button>

            {postId && (
              <Button block color='success' tag={Link} to={`post/${postId}`}>
                View your post!
              </Button>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Preview</Label>
            <div className='border p-2'>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.body
                }}
              ></div>
            </div>
          </FormGroup>
        </Form>
      </Container>
    </Container>
  )
}
export default EditPage
