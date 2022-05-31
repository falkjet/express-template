import html from "html-template-tag";
import { database } from "../../database.js";
import { layout } from "../../layout.js";

const usersCollection = database.collection("users");

export async function get(req, res) {
  if (!req.user) return res.redirect("/login");
  const users = await usersCollection.find().toArray();
  res.html`$${layout(
    { title: "Home", req },
    html`<div>
      ${users.map(
        (user) =>
          html`
            <a href="/users/${user._id}" class="box"
              >Username: ${user.username}</a
            >
          `
      )}
    </div>`
  )}`;
}
