import Home from "./components/Home";
import About from "./components/About";
import Help from "./components/Help";
import Search from "./components/Search";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from "./Layouts/AppLayout";
import Upload from "./components/Upload";


export default function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/help",
        element: <Help />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/upload",
        element: <Upload/>
      }
    ]
  }
])
  return <RouterProvider router={router} />;
}
