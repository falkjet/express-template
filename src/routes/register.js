const { layout } = require("../layout");
const html = require("html-template-tag");
const { database } = require("../database");
const { hash } = require("bcrypt");
const { promisify } = require("util");

const users = database.collection("users");

module.exports = {
  get(req, res) {
    res.html`$${layout(
      { title: "register", req },
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
          <p class="error pb-2">${req.error || ""}</p>
          <div class="field">
            <div class="control">
              <button type="submit" class="button">Register</button>
            </div>
          </div>
        </form>
      `
    )}`;
  },

  async post(req, res, next) {
    const { username, password } = req.body;
    if (typeof username !== "string") {
      req.error = "username must be string";
      this.get(req, res);
      return;
    } else if (username.length < 3) {
      req.error = "username must be at least 3 characters";
      this.get(req, res);
      return;
    } else if (typeof password !== "string") {
      req.error = "password must be string";
      this.get(req, res);
      return;
    } else if (password.length < 8) {
      req.error = "password must be at least 8 characters";
      this.get(req, res);
      return;
    } else if (await users.findOne({ username })) {
      req.error = "another user with this username alredy exists";
      this.get(req, res);
      return;
    } else {
      const user = { username, password: await hash(password, 10) };
      const result = await users.insertOne(user);
      user._id = result.insertedId;
      await promisify(req.login.bind(req))(user);
      res.redirect("/");
    }
  },
};
