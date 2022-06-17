import html from "html-template-tag";
import { layout } from "../layout.js";

export function get(req, res) {
  res.html`$${layout(
    { title: "Home", req },
    html` <h1 class="is-size-1">Hello</h1> `
  )}`;
}
