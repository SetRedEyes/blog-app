import EditPage from '../pages/editPage'
import Home from '../layouts/home'

export interface IRoute {
  element: React.ComponentType
  path: string
}

export enum RouteNames {
  Home = '/',
  PostPage = '/post/:postId',
  CreatePostPage = '/edit',
  EditPostPage = 'edit/:postId'
}

export const routes: IRoute[] = [
  { path: RouteNames.Home, element: Home },
  { path: RouteNames.PostPage, element: Home },
  {
    path: RouteNames.CreatePostPage,
    element: EditPage
  },
  {
    path: RouteNames.EditPostPage,
    element: EditPage
  }
]
