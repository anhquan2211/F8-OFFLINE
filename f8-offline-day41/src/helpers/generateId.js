import removeAccent from "./removeAccent";

function generateId(str) {
  var word = removeAccent(
    (str + new Date().toLocaleString()).replaceAll(" ", "")
  );
  var char = word.split("");
  for (var i = 0; i < char.length; i++) {
    var j = Math.floor(Math.random() * char.length);
    var temp = char[i];
    char[i] = char[j];
    char[j] = temp;
  }
  return char.join("");
}
export default generateId;
