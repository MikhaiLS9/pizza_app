import Button from "./components/Button/Button";
import Input from "./components/Input/Input";

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Menu } from "./pages/Menu/Menu";
import { Cart } from "./pages/Cart/Car";
import { Error } from "./pages/Error/Error";
import { Layout } from "./layout/Menu/Menu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />

      <Button apperarence="small">Button</Button>
      <Button apperarence="big">Button</Button>
      <Input placeholder="Email" />
    </>
  );
}

export default App;
