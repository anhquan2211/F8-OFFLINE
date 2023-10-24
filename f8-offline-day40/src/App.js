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
      path: "/f8-offline-day40/dist/index.html",
      component: Home,
    },
    {
      path: "/f8-offline-day40/dist",
      component: Home,
    },
    {
      path: "/f8-offline-day40/dist/gioi-thieu",
      component: About,
    },
    {
      path: "/f8-offline-day40/dist/san-pham",
      component: Products,
    },
    {
      path: "/f8-offline-day40/dist/san-pham/:id",
      component: ProductDetail,
    },
  ];

  router(routeConfig, DefaultLayout);
};
