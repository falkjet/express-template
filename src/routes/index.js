const html = require("html-template-tag");
const { layout } = require("../layout");

module.exports = {
  get(req, res) {
    res.html`$${layout({ title: "Home", req }, html` <h1>Hello</h1> `)}`;
  },
};
