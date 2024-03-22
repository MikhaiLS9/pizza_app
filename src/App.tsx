import "./App.css";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { Cart } from "./pages/Cart/Car";
import { Error } from "./pages/Error/Error";
import { Layout } from "./layout/Menu/Layout";
import Product from "./pages/Product/Product";
import axios from "axios";
import { PREFIX } from "./helpers/API";
import { Suspense, lazy } from "react";
import Headlin from "./components/Headlin/Headlin";
// import Headlin from "./components/Headlin/Headlin";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={"Загружаю ...."}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/products/:id",
        element: <Product />,
        errorElement: <><Headlin>Ошибка загрузки, нет данных для загрузки. Не получается загрузить товары</Headlin></>,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .get(`${PREFIX}/products/${params.id}`)
                  .then((data) => resolve(data))
                  .catch((e) => reject(e));
              }, 1000);
            }),
          });
        },
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
