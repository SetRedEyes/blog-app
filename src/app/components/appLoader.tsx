import { useEffect } from 'react'
import { useAppDispatch } from '../hooks/redux'
import { loadPostsList } from '../store/reducers/posts'

export interface IAppLoader {
  children: React.ReactNode
}

const AppLoader = ({ children }: IAppLoader) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadPostsList())
  }, [])

  return <>{children}</>
}

export default AppLoader
