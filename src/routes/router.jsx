import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import AllRecipes from '../pages/AllRecipes';
import AddRecipe from '../pages/AddRecipe';
import MyRecipes from '../pages/MyRecipes';
import RecipeDetails from '../pages/RecipeDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'all-recipes', element: <AllRecipes /> },
      { path: 'add-recipe', element: <PrivateRoute><AddRecipe /></PrivateRoute> },
      { path: 'my-recipes', element: <PrivateRoute><MyRecipes /></PrivateRoute> },
      { path: 'recipes/:id', element: <PrivateRoute><RecipeDetails /></PrivateRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  // 404 sits outside MainLayout so it has no navbar or footer
  { path: '*', element: <NotFound /> },
]);

export default router;
