// main.js
import { MyWysiwyg } from "./modules/my_wysiwyg.js";

const mw = new MyWysiwyg(document.querySelector("textarea"), {
  buttons: ["gras", "italique", "youtube", "barré", "maps","youtube","plus"],
});
