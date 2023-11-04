import { endpoint } from "../configs/config";
import HttpClient from "../configs/client";

const client = new HttpClient();

export default async function getProduct() {
  try {
    const { data: dataProducts, res } = await client.get(endpoint.products);

    console.log("dataProducts: ", dataProducts);
    console.log("res: ", res);
    if (res.ok) {
      const productList = dataProducts.data;
      return productList;
    } else {
      return "Đã có lỗi xảy ra. Vui lòng thử lại!";
    }
  } catch (e) {
    console.log(e);
  }
}
