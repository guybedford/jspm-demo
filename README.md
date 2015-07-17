jspm Demo
===

Setup:

```
  npm install jspm -g
  git clone git@github.com:guybedford/jspm-demo
  cd jspm-demo
  jspm install
  python -m SimpleHTTPServer
  open http://localhost:8000
```

To use the bundled version, remove the comments in `config.js` and `index.html`.

The ES6 markdown component is installed from https://github.com/guybedford/markdown-component.

---

Reproduce this demo from scratch:

Assuming _app.js_, _index.html_ and a _package.json_ exist already.

```
jspm init               # default to all, just hit ENTER
jspm install css        # use jspm css loader plugin
jspm install bootstrap  # install bootstrap via jspm registry map
jspm install github:guybedford/markdown-component
jspm install npm:voxel-demo
```

```
jspm bundle app app-bundle.js
jspm bundle voxel-demo voxel-bundle.js
```
