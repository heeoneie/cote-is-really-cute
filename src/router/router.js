import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ProblemSolving from '../pages/ProblemSolving';
import CategoryBtn from '../components/CategoryBtn';
import ProtectedRoute from './ProtectedRoute';
import AccountEdit from '../pages/AccountEdit';

const routes = [
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
  {
    path: '/solve/:category/:level/:index',
    element: (
      <ProtectedRoute>
        <ProblemSolving />
      </ProtectedRoute>
    ),
  },
  {
    path: '/AccountEdit',
    element: (
      <ProtectedRoute>
        <AccountEdit />
      </ProtectedRoute>
    ),
  },
];

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);

export default router;
