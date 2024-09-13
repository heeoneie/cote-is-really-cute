import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ProblemSolving from '../pages/ProblemSolving';
import CategoryBtn from '../components/CategoryBtn';
import ProtectedRoute from './ProtectedRoute';
import StudyPage from '../pages/StudyPage';

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
    path: '/solve/:category/:level/:index', // 문제 풀이 페이지를 위한 라우트
    element: (
      <ProtectedRoute>
        <ProblemSolving />
      </ProtectedRoute>
    ),
  },
  //임시 test 코드
  {
    path: '/study',
    element: <StudyPage />,
  },
];

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);

export default router;
