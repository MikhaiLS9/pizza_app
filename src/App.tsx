import "./App.css";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { Cart } from "./pages/Cart/Car";
import { Error } from "./pages/Error/Error";
import { Layout } from "./layout/Menu/Layout";
import Product from "./pages/Product/Product";
import axios from "axios";
import { PREFIX } from "./helpers/API";
import { Suspense, lazy } from "react";

import AuthLayout from "./layout/Auth/AuthLayout";

import { RequireAuth } from "./helpers/ReciareAuth";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Success from "./pages/Success/Success.tsx";
import Headline from "./layout/components/Headline/Headline.tsx";
import Login from "./layout/components/Login/Login.tsx";
import Registration from "./layout/components/Registration/Registration.tsx";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <AuthLayout />,
  //   children: [
  //     { path: "pizza_app/auth/login", element: <Login /> },
  //     { path: "pizza_app/auth/registration", element: <Registration /> },
  //   ],
  // },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/pizza_app",
        element: (
          <Suspense fallback={"Загружаю ...."}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/pizza_app/cart",
        element: <Cart />,
      },
      {
        path: "/pizza_app/success",
        element: <Success />,
      },
      {
        path: "/products/:id",
        element: <Product />,
        errorElement: (
          <>
            <Headline>
              Ошибка загрузки, нет данных для загрузки. Не получается загрузить
              товары
            </Headline>
          </>
        ),
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
    path: "/pizza_app/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "registration", element: <Registration /> },
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
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
