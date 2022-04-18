const html = require("html-template-tag");

function navbar(req) {
  if (typeof req.user === "object") return html` <div>navbar</div> `;
}

function layout({ req, title }, content) {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
        />
        <title>${title}</title>
      </head>
      <body>
        $${navbar(req)}
        <div class="container py-5 px-3">$${content}</div>
      </body>
    </html>
  `;
}

module.exports = { navbar, layout };
