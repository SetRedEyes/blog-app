import { Navigate, Route, Routes } from 'react-router-dom'
import AppLoader from './components/appLoader'
import { routes } from './routes/routes'

const App = () => {
  return (
    <AppLoader>
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          )
        })}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
     </AppLoader>
  )
}

export default App
