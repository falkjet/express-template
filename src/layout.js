const html = require("html-template-tag");

function navbar(req) {
  return html`
    <div class="navbar is-dark">
      <div class="navbar-brand">
        <div class="navbar-item">Website</div>
        <div class="navbar-burger"><span></span><span></span><span></span></div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          $${req.user
            ? html`<a href="/logout" class="navbar-item">Log Out</a>`
            : html`<a href="/login" class="navbar-item">Log In</a>`}
        </div>
      </div>
    </div>
  `;
}

function layout({ req, title }, content) {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="/public/navbar.js" defer></script>
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
