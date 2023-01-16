import { useRoutes } from 'react-router-dom';
import HomeRoutes from './HomeRoutes';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

export default function ThemeRoutes() {
  return useRoutes([HomeRoutes]);
}
