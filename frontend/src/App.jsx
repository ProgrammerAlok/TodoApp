import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import Todo from './pages/Todo'
import { CircularProgress } from '@mui/material';
import { axiosInstnce, endpoints } from './utils/axiosInstance';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/Routes';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}

export default App
