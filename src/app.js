const express = require("express");
const html = require("html-template-tag");

const app = express();
app.use((req, res, next) => {
  res.once("close", () => {
    const status =
      (res.statusCode >= 400
        ? `\x1b[31m`
        : res.statusCode >= 300
        ? `\x1b[33m`
        : `\x1b[32m`) + `${res.statusCode}`;
    console.log(
      `\x1b[32m[${req.method}] \x1b[0;2m${req.path} \x1b[0m${status} \x1b[0m`
    );
  });
  res.html = (...args) => res.type("html").send(html(...args));
  next();
});

module.exports = app;
