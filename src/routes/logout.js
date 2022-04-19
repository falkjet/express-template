const html = require("html-template-tag");
const { layout } = require("../layout");

module.exports = {
  get(req, res) {
    res.html`$${layout(
      { req, res, title: "Log Out" },
      html`
        <form method="POST" class="box">
          <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
          <h2 class="is-size-3 mb-3">Log Out</h2>
          <button type="submit" class="button">Log Out</button>
        </form>
      `
    )}`;
  },
  post(req, res) {
    req.logout();
    res.redirect("/");
  },
};
