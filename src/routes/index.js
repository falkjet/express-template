const html = require("html-template-tag");

const template = ({ title }, body) => html`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      ${body}
    </body>
  </html>`;

module.exports = {
  get(req, res) {
    res.html`${template("Home", html` <h1>Hello</h1> `)}`;
  },
};
