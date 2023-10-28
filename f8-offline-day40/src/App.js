import { router } from "./Utils/router";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Products } from "./Pages/Products";
import { ProductDetail } from "./Pages/ProductDetail";
import { DefaultLayout } from "./Layouts/DefaultLayout";

export const App = () => {
  console.log("Đã vào hàm App()");

  const routeConfig = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/gioi-thieu",
      component: About,
    },
    {
      path: "/san-pham",
      component: Products,
    },
    {
      path: "/san-pham/:id",
      component: ProductDetail,
    },
  ];

  router(routeConfig, DefaultLayout);
};
