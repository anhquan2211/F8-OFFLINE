/* eslint-disable no-undef */
//Import Library

//Import File
import { endpoint } from "../configs/config";
import HttpClient from "../configs/client";

//Khởi tạo đối tượng từ class HttpClient
const client = new HttpClient();

//Function lấy APi Key từ server qua email
export default async function getProfile() {
  try {
    const { data, res } = await client.get(
      endpoint.profile,
      {},
      localStorage.getItem("apiKey")
    );

    if (res.ok) {
      const name = data.data.emailId.name;
      return name;
    } else {
      return res.message;
    }
  } catch (e) {
    console.log("error: ", e);
  }
}
