import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-indigo-600 text-lg font-medium">
        Loading...
      </div>
    )
  }

  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute
