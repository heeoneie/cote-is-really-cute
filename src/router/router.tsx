import { createBrowserRouter, RouteObject } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ProblemSolving from '../pages/ProblemSolving';
import CategoryBtn from '../components/CategoryBtn';
import ProtectedRoute from './ProtectedRoute';
import PetRoom from '../pages/PetRoom';
import Battle from '../pages/Battle';
import Pvp from '../pages/Pvp';
import MyPage from '../pages/MyPage';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
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
    path: '/petroom',
    element: (
      <ProtectedRoute>
        <PetRoom />
      </ProtectedRoute>
    ),
  },
  {
    path: '/battle/:matchId',
    element: (
      <ProtectedRoute>
        <Battle />
      </ProtectedRoute>
    ),
  },
  {
    path: '/pvp',
    element: (
      <ProtectedRoute>
        <Pvp />
      </ProtectedRoute>
    ),
  },
  {
    path: '/mypage',
    element: (
      <ProtectedRoute>
        <MyPage />
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
