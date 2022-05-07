console.clear();

const glob = require("glob");
const app = require("./app");
const { join, relative, sep } = require("path/posix");
const nativepath = require("path");
const { mongoClient } = require("./database");

async function main() {
  await mongoClient.connect();

  const dirname = nativepath
    .relative(process.cwd(), __dirname)
    .split(nativepath.sep)
    .join(sep);
  const promises = glob
    .sync(join(dirname, "routes/**/*.{js,mjs,cjs}"))
    .map(async (path) => {
      const importpath = "./" + relative(dirname, path);
      const mod = await import(importpath);
      path = join("/", relative(join(dirname, "routes"), path));
      path = path.substring(0, path.lastIndexOf("."));
      if (path.endsWith("index")) path = path.substring(0, path.length - 5);

      const middleware = [
        ...(mod.middleware || []),
        ...((mod.default && mod.default.middleware) || []),
      ];
      if (middleware.length) app.use(...middleware);
      for (let method of ["get", "post", "put", "patch", "delete"]) {
        if (mod[method]) {
          app[method](path, mod[method].bind(mod));
        }
        if (method in (mod.default || {})) {
          app[method](path, mod.default[method].bind(mod.default));
        }
      }
    });

  await Promise.all(promises);

  const server = app.listen(3000);
  console.log("listening on \x1b[36mhttp://localhost:3000\x1b[0m");
  process.on("SIGTERM", () => {
    server.close(() => console.log("server closed"));
    mongoClient.close();
  });
}

main().catch(console.error);
