console.clear();

const glob = require("glob");
const app = require("./app");
const { join, relative } = require("path");

async function main() {
  const promises = glob
    .sync(join(__dirname, "routes/**/*.{jsx,js}"))
    .map(async (path) => {
      const module = await import(path);
      path = join("/", relative(join(__dirname, "routes"), path));
      if (path.endsWith(".jsx")) path = path.substring(0, path.length - 4);
      if (path.endsWith(".js")) path = path.substring(0, path.length - 3);
      if (path.endsWith("index")) path = path.substring(0, path.length - 5);

      for (let method of ["get", "post", "put", "patch", "delete"])
        if (module[method])
          app[method](path, ...(module.middleware || []), module[method]);
    });

  await Promise.all(promises);

  const server = app.listen(3000);
  console.log("listening on \x1b[36mhttp://localhost:3000\x1b[0m");
  process.on("SIGTERM", () => {
    server.close(() => console.log("server closed"));
  });
}

main().catch(console.error);
