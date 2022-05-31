import html from "html-template-tag";
import { ObjectId } from "mongodb";
import { database } from "../../database.js";
import { layout } from "../../layout.js";

export const path = ":id";
const usersCollection = database.collection("users");

export async function get(req, res) {
  if (!req.user) return res.redirect("/login");
  const user = await usersCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  res.html`$${layout(
    { title: "Home", req },
    html`<div class="box">
      <h1 class="is-size-2">${user.username}</h1>
    </div>`
  )}`;
}
