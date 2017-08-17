# react-bootstrap-externaljs

**This fork of [react-bootstrap] mainly aims on adding bootstrap's `data-*` attributes in the right places to optimize the usage of external bootstrap.js.**

In a perfect world [react-bootstrap] and [bootstrap.js]/[bootstrap.native] never meet. Fortunately my world isn't perfect and i can do silly things like this. Currently react-bootstrap has no intentions to [support] these data-attributes.

**If you're unsure, you better just stick with regular [react-bootstrap],** as you may find more silly things here...

## use case example
- You create a website with [GatsbyJS] (a static site generator) and [skip] bundle creation when building for `prod`.
- For bootstrap's functionality you mess with `bootstrap.native.js` (tested, working great) or the original `bootstrap.js` (untested) in `prod`.
- You reimplement any additional functionality from `dev` with plain js in e.g. `static.js` for `prod`.
- So, you have already brought down overall js size in `prod` from ~500Kb to ~5Kb? Congratulations...

If you now also want to use data-attributes to minimize the need for custom code, thus further reducing js size in `prod`, [react-bootstrap-externaljs] is what you need.

Also, remember how to enable [ScrollSpy] with data-attributes only? Just do it.

## Usage
`npm install react-bootstrap-externaljs`

## Local setup

- Install the dependencies with `npm install`
- Run tests `npm test`
- Run tests in watch mode `npm run tdd`
- Run the docs site in development mode with `npm run docs`. This will watch
  for file changes as you work. Simply refresh the page to see the updates.
- Build with `npm run build`

[react-bootstrap]: https://github.com/react-bootstrap/react-bootstrap
[support]: https://github.com/react-bootstrap/react-bootstrap/issues/2510
[react-bootstrap-externaljs]: https://github.com/sillyslux/react-bootstrap-externaljs

[bootstrap.native]: https://github.com/thednp/bootstrap.native/
[ScrollSpy]: http://getbootstrap.com/javascript/#via-data-attributes-2
[bootstrap.js]: http://getbootstrap.com/customize/#plugins

[GatsbyJS]: https://github.com/gatsbyjs/gatsby
[skip]: https://github.com/gatsbyjs/gatsby#structure-of-a-gatsby-site
