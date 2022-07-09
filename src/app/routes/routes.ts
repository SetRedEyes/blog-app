import MainPage from '../pages/mainPage'
import PostPage from '../pages/postPage'
import EditPostPage from '../pages/editPostPage'

export interface IRoute {
  element: React.ComponentType
  path: string
}

export enum RouteNames {
  MainPage = '/',
  PostPage = '/posts/:postId',
  EditPostPage = '/edit/:postId'
}

export const routes: IRoute[] = [
  { path: RouteNames.MainPage, element: MainPage },
  {
    path: RouteNames.PostPage,
    element: PostPage
  },
  {
    path: RouteNames.EditPostPage,
    element: EditPostPage
  }
]
