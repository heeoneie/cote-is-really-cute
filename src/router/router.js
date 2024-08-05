import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import CategoryBtn from '../components/CategoryBtn';
import ProtectedRoute from '../router/ProtectedRoute';

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/categories',
        element: (
          <ProtectedRoute>
            <CategoryBtn />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
