import { layout } from "../layout.js";
import html from "html-template-tag";

export function get(req, res) {
  if (!req.user) return res.redirect("/login");
  res.html`$${layout(
    { title: "Secret page", req },
    html`
      <p>This is a secret page. Only users who are logged in can read this.</p>
    `
  )}`;
}
