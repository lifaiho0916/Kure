import HomeLayout from 'layout/HomeLayout';
import CategoryPage from 'pages/home/Category.js'
import ProductDetail from "pages/ProductDetail";
import PressReleaseCannabisContest from "pages/press-release-cannabis-contest";
import FarmStories from "pages/FarmStories";
import FarmStoryDetail from "pages/FarmStoryDetail";
import FrontPage from "pages/home/Frontpage";
import Login from "pages/authentication/Login";
import Register from "pages/authentication/Register";
import ResetPassword from "pages/authentication/ResetPassword";
import ResetDrupalPath from "pages/authentication/ResetDrupalPath";
import VerifyDrupalPath from "pages/authentication/VerifyDrupalPath";

const HomeRoutes = {
  path: '/',
  element: <HomeLayout/>,
  children: [
    {
      path: '/',
      element: <FrontPage/>,
    },
    {
      path: '/products/:product_category',
      element: <CategoryPage/>,
    },
    // It's safe to pass the product_name as a parameter because Drupal ensures each title is unique.
    {
      path: ':drupal_variation_link',
      element: <ProductDetail/>,
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '/reset',
      element: <ResetPassword/>
    },
    {
      path: '/user/reset/:uid/:timestamp/:hash',
      element: <ResetDrupalPath/>
    },
    {
      path: '/user/verify/:uid/:timestamp/:hash',
      element: <VerifyDrupalPath/>
    },
    {
      path: '/press-release',
      element: <PressReleaseCannabisContest/>
    },
    {
      path: '/farm-stories',
      element: <FarmStories/>
    },
    {
      path: '/farm-stories-detail',
      element: <FarmStoryDetail/>
    }
  ]
};
export default HomeRoutes;