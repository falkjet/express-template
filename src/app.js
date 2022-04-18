const express = require("express");
const html = require("html-template-tag");
const expressSession = require("express-session");
const { mongoClient, database } = require("./database");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { compare } = require("bcrypt");
const { ObjectId } = require("bson");
const csurf = require("csurf");

const sessionConfig = {
  secret: process.env.SECRET,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 /* two days */ },
  resave: true,
  store: MongoStore.create({ client: mongoClient }),
};

const users = database.collection("users");
passport.use(
  new LocalStrategy(async (username, password, cb) => {
    const user = await users.findOne({ username });
    if (!user) return cb(null, false);
    else if (!(await compare(password, user.password))) return cb(null, false);
    else return cb(null, user);
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await users.findOne({ _id: new ObjectId(id) });
  cb(null, user || false);
});

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

// app.use("/public", express.static("./public"));
// app.use(expressSession(sessionConfig));
// app.use(passport.authenticate("session"));

module.exports = app;
