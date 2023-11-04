import HttpClient from "../configs/client";

const client = new HttpClient();

export const postOrder = (body) => {
  const response = client.post(
    "/orders",
    body,
    {},
    localStorage.getItem("apiKey")
  );
  return response;
};
