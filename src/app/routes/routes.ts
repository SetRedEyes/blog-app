import MainPage from '../pages/mainPage'
import PostPage from '../pages/postPage'
import EditPostPage from '../pages/editPostPage'

export interface IRoute {
  name: string
  element: React.ComponentType
  path: string
}

export enum RouteNames {
  MainPage = '/',
  PostPage = '/posts/:postId',
  CreatePostPage = '/edit',
  EditPostPage = '/edit/:postId'
}

export const routes: IRoute[] = [
  { path: RouteNames.MainPage, element: MainPage, name: 'MainPage' },
  {
    path: RouteNames.PostPage,
    element: PostPage,
    name: 'PostPage'
  },
  {
    path: RouteNames.CreatePostPage,
    element: EditPostPage,
    name: 'CreatePost'
  },
  {
    path: RouteNames.EditPostPage,
    element: EditPostPage,
    name: 'EditPost'
  }
]
