function removeAccent(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace("đ", "d")
    .replace("Đ", "D")
    .replace(/ /g, "-");
}
export default removeAccent;
