import html from "html-template-tag";

export default (err, req, res, next) => {
  res.status(500);
  if (req.app.get("env") !== "development") {
    return res.html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Document</title>
        </head>
        <body>
          <h1>500</h1>
          <p>An error occured on the server</p>
        </body>
      </html>
    `;
  }
  let message = html`${err}`;
  if (err.stack) {
    console.log(err.stack);
    const lines = err.stack.split("\n");
    message = lines
      .map((line) => {
        let m = line.match(/\s+at (?<call>.*) \((?<file>.*)\)/);
        if (m) {
          const { call, file } = m.groups;
          const {
            groups: { path, line, column },
          } = file.match(/(?<path>.+):(?<line>[0-9]+):(?<column>[0-9]+)/);
          return html`<div style="padding-left: 4ch">
            <span class="static">at</span>
            <span class="file">
              ${path}<span class="static">:</span>${line}<span class="static"
                >:</span
              >${column}
            </span>
            <span class="call">${call}</span>
          </div>`;
        }
        m = line.match(/\s+at (?<file>.*)/);
        if (m) {
          const { file } = m.groups;
          const {
            groups: { path, line, column },
          } = file.match(/(?<path>.+):(?<line>[0-9]+):(?<column>[0-9]+)/);
          return html`<div style="padding-left: 4ch">
            <span class="static">at</span>
            <span class="file">
              ${path}<span class="static">:</span>${line}<span class="static"
                >:</span
              >${column}
            </span>
          </div>`;
        }
        return html`<span class="error">${line}</span>`;
      })
      .join("\n");
  }
  res.html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Document</title>
      </head>
      <body>
        <style>
          body {
            padding: 10px;
            background: #333;
            color: white;
          }
          pre {
            margin: 0;
          }
          .static {
            color: #fffa
          }
          .error {
            color: #f55;
            font-weight: bold;
          }
          .call {
            color: #eee;
          }
          .file {
            color: #f55;
          }
          .file:hover {
            text-decoration: underline;
          }
        </style>
        <div>$${message}</div>
      </body>
    </html>
  `;
  console.log("test");
};
