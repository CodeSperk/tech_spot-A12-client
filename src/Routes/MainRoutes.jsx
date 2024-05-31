import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../Layouts/RootLayout';
import Home from '../Pages/Home/Home';

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children:[
      {
        path:"/",
        element:<Home/>
      }
    ]
  }
])

export default MainRoutes;