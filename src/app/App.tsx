import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes/routes'

const App = () => {
  return (
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
       <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
  </Routes>
  )
}

export default App
