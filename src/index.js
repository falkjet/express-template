console.clear();

import glob from "glob";
import { dirname, isAbsolute, join, relative } from "path/posix";
import url from "url";
import app from "./app.js";
import { mongoClient } from "./database.js";
import errorhandler from "./errorhandler.js";

const globUrl = (u) =>
  glob.sync(url.fileURLToPath(u)).map((p) => url.pathToFileURL(p).href);

const wrapHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (e) {
    next(e);
  }
};

async function main() {
  const rootUrl = dirname(import.meta.url);
  const routesUrl = join(rootUrl, "routes");
  const promises = globUrl(join(routesUrl, "**/*.{js,mjs,cjs}")).map(
    async (modUrl) => {
      const mod = await import(modUrl);
      let path = join("/", relative(routesUrl, modUrl));
      path = path.substring(0, path.lastIndexOf("."));
      const pathOverride = mod.path || (mod.default && mod.default.path);
      if (pathOverride) {
        if (isAbsolute(pathOverride)) path = pathOverride;
        else path = join(path, "..", pathOverride);
      } else if (path.endsWith("index")) {
        path = path.substring(0, path.length - 5);
      }
      console.log(path);

      const middleware = [
        ...(mod.middleware || []),
        ...((mod.default && mod.default.middleware) || []),
      ];
      if (middleware.length) app.use(path, ...middleware.map(wrapHandler));

      for (let method of ["get", "post", "put", "patch", "delete"]) {
        if (mod[method]) app[method](path, wrapHandler(mod[method]));
        if (method in (mod.default || {}))
          app[method](path, wrapHandler(mod.default[method]));
      }
    }
  );

  await Promise.all(promises).catch((e) => console.log(e));

  const port = Number.parseInt(process.env.PORT) || 3000;
  const server = app.listen(port);
  console.log(`listening on \x1b[36mhttp://localhost:${port}\x1b[0m`);
  process.on("SIGTERM", () => {
    server.close(() => console.log("server closed"));
    mongoClient.close();
  });
  app.use(errorhandler);
}

main().catch(console.error);
