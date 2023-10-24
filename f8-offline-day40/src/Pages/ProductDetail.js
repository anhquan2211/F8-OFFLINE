export const ProductDetail = (route) => {
  return `
    <h1>Chi tiết sản phẩm: ${route.data.id}</h1>
    <button onclick="navigate('/san-pham')">Back</button>
    `;
};
