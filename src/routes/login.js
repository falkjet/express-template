import html from "html-template-tag";
import passport from "passport";
import { layout } from "../layout.js";
import { promisify } from "util";

export function get(req, res) {
  res.html`$${layout(
    { req, title: "Log In" },
    html`
      <form method="POST">
        <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
        <div class="field">
          <label for="">Username</label>
          <div class="control">
            <input
              type="text"
              name="username"
              id="username-input"
              class="input"
              value="${req.body.username}"
            />
          </div>
        </div>

        <div class="field">
          <label for="">Password</label>
          <div class="control">
            <input
              type="password"
              name="password"
              id="password-input"
              class="input"
              value="${req.body.password}"
            />
          </div>
        </div>
        <p class="error">${req.error || ""}</p>
        <div class="field">
          <div class="control">
            <button type="submit" class="button">Log In</button>
          </div>
        </div>
      </form>
    `
  )}`;
}

export async function post(req, res, next) {
  const user = await new Promise((resolve, reject) =>
    passport.authenticate("local", (err, user) =>
      err ? reject(err) : resolve(user)
    )(req, res, next)
  );
  if (user) {
    await promisify(req.login.bind(req))(user);
    res.redirect("/");
  } else {
    req.error = "Wrong username or password";
    this.get(req, res);
  }
}
