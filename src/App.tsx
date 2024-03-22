import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Menu } from "./pages/Menu/Menu";
import { Cart } from "./pages/Cart/Car";
import { Error } from "./pages/Error/Error";
import { Layout } from "./layout/Menu/Layout";
import Product from "./pages/Product/Product";
import axios from "axios";
import { PREFIX } from "./helpers/API";

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
      {
        path: "/products/:id",
        element: <Product />,
        loader: async ({params}) => {
          const {data} = await axios.get(`${PREFIX}/products/${params.id}`)
          return data
        }
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
    </>
  );
}

export default App;
