System.config({
  "paths": {
    "*": "*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "github:*": "jspm_packages/github/*.js"
  }
// uncomment to use bundled form:  
/*,
  "bundles": {
    "voxel-bundle": ["npm:voxel-demo@0.0.1"]
  } */
});

System.config({
  "map": {
    "github:guybedford/markdown-component": "github:guybedford/markdown-component@^0.1.0",
    "github:guybedford/markdown-component@0.1.0": {
      "showdown": "github:coreyti/showdown@^0.3.1",
      "css": "github:systemjs/plugin-css@0.1.0",
      "prism": "github:LeaVerou/prism@gh-pages"
    },
    "bootstrap": "github:twbs/bootstrap@^3.1.1",
    "github:twbs/bootstrap@3.1.1": {
      "jquery": "github:components/jquery@^2.1.0",
      "css": "github:systemjs/plugin-css@^0.1.0"
    },
    "npm:voxel-demo": "npm:voxel-demo@^0.0.1",
    "npm:voxel-demo@0.0.1": {
      "gl-vao": "npm:gl-vao@0.0",
      "gl-buffer": "npm:gl-buffer@0.1",
      "gl-tile-map": "npm:gl-tile-map@0.3",
      "ndarray-ops": "npm:ndarray-ops@1.1",
      "ndarray-fill": "npm:ndarray-fill@0.1",
      "gl-matrix": "npm:gl-matrix@2.0",
      "gl-now": "npm:gl-now@0.0",
      "ao-mesher": "npm:ao-mesher@0.2",
      "ao-shader": "npm:ao-shader@0.2",
      "gl-shader": "npm:gl-shader@0.0.6",
      "ndarray": "npm:ndarray@1.0"
    },
    "npm:gl-buffer@0.1.2": {
      "ndarray-ops": "npm:ndarray-ops@^1.1.0",
      "ndarray": "npm:ndarray@^1.0.10",
      "typedarray-pool": "npm:typedarray-pool@^0.1.1"
    },
    "npm:gl-tile-map@0.3.0": {
      "ndarray": "npm:ndarray@^1.0.3",
      "webglew": "npm:webglew@0.0",
      "tile-mip-map": "npm:tile-mip-map@0.2",
      "gl-texture2d": "npm:gl-texture2d@^0.1.2"
    },
    "npm:gl-matrix@2.0.0": {},
    "npm:gl-shader@0.0.6": {
      "glsl-exports": "npm:glsl-exports@0.0",
      "uniq": "npm:uniq@^0.0.2"
    },
    "npm:ao-shader@0.2.3": {
      "gl-shader": "npm:gl-shader@^0.0.6",
      "brfs": "npm:brfs@^0.0.5"
    },
    "npm:ndarray-fill@0.1.0": {
      "cwise": "npm:cwise@^0.3.2"
    },
    "npm:gl-now@0.0.4": {
      "webglew": "npm:webglew@0.0",
      "game-shell": "npm:game-shell@^0.1.3"
    },
    "npm:ao-mesher@0.2.10": {
      "ndarray": "npm:ndarray@^1.0.1",
      "typedarray-pool": "npm:typedarray-pool@^0.1.1",
      "cwise-compiler": "npm:cwise-compiler@0.1",
      "greedy-mesher": "npm:greedy-mesher@1.0"
    },
    "npm:ndarray@1.0.15": {
      "iota-array": "npm:iota-array@1"
    },
    "npm:webglew@0.0.0": {},
    "npm:typedarray-pool@0.1.2": {
      "bit-twiddle": "npm:bit-twiddle@^0.0.2",
      "dup": "npm:dup@0.0"
    },
    "npm:tile-mip-map@0.2.1": {
      "ndarray": "npm:ndarray@^1.0.3",
      "ndarray-ops": "npm:ndarray-ops@1.1",
      "ndarray-downsample2x": "npm:ndarray-downsample2x@0.1"
    },
    "npm:glsl-exports@0.0.0": {
      "glsl-tokenizer": "npm:glsl-tokenizer@^0.0.8",
      "glsl-parser": "npm:glsl-parser@^0.0.5",
      "through": "npm:through@^2.3.4"
    },
    "npm:ndarray-ops@1.1.1": {
      "cwise-compiler": "npm:cwise-compiler@0.0"
    },
    "npm:brfs@0.0.5": {
      "through": "npm:through@2.2",
      "falafel": "npm:falafel@^0.1.6",
      "escodegen": "npm:escodegen@0.0.17"
    },
    "npm:uniq@0.0.2": {},
    "npm:gl-shader@0.0.5": {
      "uniq": "npm:uniq@^0.0.2",
      "glsl-exports": "npm:glsl-exports@0.0"
    },
    "npm:game-shell@0.1.4": {
      "uniq": "npm:uniq@^0.0.2",
      "iota-array": "npm:iota-array@0.0",
      "domready": "npm:domready@^0.2.11",
      "lower-bound": "npm:lower-bound@^0.0.1",
      "invert-hash": "npm:invert-hash@0.0",
      "vkey": "npm:vkey@^0.0.2"
    },
    "npm:iota-array@1.0.0": {},
    "npm:cwise-compiler@0.1.0": {
      "uniq": "npm:uniq@^0.0.2"
    },
    "npm:gl-texture2d@0.1.12": {
      "webglew": "npm:webglew@^0.0.0",
      "ndarray": "npm:ndarray@^1.0.10",
      "ndarray-ops": "npm:ndarray-ops@^1.1.0",
      "bit-twiddle": "npm:bit-twiddle@^0.0.2",
      "cwise-compiler": "npm:cwise-compiler@0.1",
      "typedarray-pool": "npm:typedarray-pool@1"
    },
    "npm:cwise@0.3.4": {
      "cwise-compiler": "npm:cwise-compiler@0.0",
      "cwise-parser": "npm:cwise-parser@^0.0.1"
    },
    "npm:glsl-tokenizer@0.0.8": {
      "through": "npm:through@^2.3.4"
    },
    "npm:ndarray-downsample2x@0.1.1": {
      "ndarray-ops": "npm:ndarray-ops@1.1",
      "cwise": "npm:cwise@^0.3.3",
      "ndarray-fft": "npm:ndarray-fft@0.1",
      "ndarray-scratch": "npm:ndarray-scratch@^0.0.1"
    },
    "npm:iota-array@0.0.1": {},
    "npm:falafel@0.1.6": {
      "esprima": "npm:esprima@^1.0.2"
    },
    "npm:escodegen@0.0.17": {
      "esprima": "npm:esprima@^1.0.2",
      "estraverse": "npm:estraverse@^0.0.4"
    },
    "npm:glsl-parser@0.0.5": {
      "glsl-tokenizer": "npm:glsl-tokenizer@^0.0.2",
      "through": "npm:through@^1.1.2"
    },
    "npm:dup@0.0.0": {},
    "npm:typedarray-pool@1.0.2": {
      "bit-twiddle": "npm:bit-twiddle@1",
      "dup": "npm:dup@1"
    },
    "npm:cwise-compiler@0.0.0": {
      "uniq": "npm:uniq@^0.0.2"
    },
    "npm:gl-vao@0.0.3": {
      "webglew": "npm:webglew@0.0"
    },
    "npm:lower-bound@0.0.1": {},
    "npm:cwise-parser@0.0.1": {
      "esprima": "npm:esprima@^1.0.3",
      "uniq": "npm:uniq@^0.0.2"
    },
    "npm:greedy-mesher@1.0.2": {
      "typedarray-pool": "npm:typedarray-pool@1",
      "iota-array": "npm:iota-array@1",
      "uniq": "npm:uniq@1"
    },
    "npm:through@2.2.7": {},
    "npm:domready@0.2.13": {},
    "npm:bit-twiddle@0.0.2": {},
    "npm:through@2.3.4": {},
    "npm:invert-hash@0.0.0": {},
    "npm:ndarray-fft@0.1.0": {
      "bit-twiddle": "npm:bit-twiddle@^0.0.2",
      "ndarray": "npm:ndarray@1.0",
      "ndarray-ops": "npm:ndarray-ops@1.1",
      "cwise": "npm:cwise@^0.3.2",
      "typedarray-pool": "npm:typedarray-pool@^0.1.1"
    },
    "npm:bit-twiddle@1.0.2": {},
    "npm:through@1.1.2": {},
    "npm:glsl-tokenizer@0.0.2": {},
    "npm:vkey@0.0.2": {},
    "npm:dup@1.0.0": {},
    "npm:uniq@1.0.1": {},
    "npm:ndarray-scratch@0.0.1": {
      "ndarray": "npm:ndarray@^1.0.3",
      "typedarray-pool": "npm:typedarray-pool@^0.1.1"
    },
    "npm:esprima@1.2.2": {},
    "npm:estraverse@0.0.4": {},
    "github:jspm/nodelibs@0.0.2": {
      "inherits": "npm:inherits@^2.0.1",
      "base64-js": "npm:base64-js@^0.0.4",
      "ieee754": "npm:ieee754@^1.1.1",
      "Base64": "npm:Base64@0.2",
      "json": "github:systemjs/plugin-json@master"
    },
    "npm:inherits@2.0.1": {},
    "npm:base64-js@0.0.4": {},
    "npm:ieee754@1.1.3": {},
    "npm:Base64@0.2.1": {}
  }
});

System.config({
  "versions": {
    "github:guybedford/markdown-component": "0.1.0",
    "github:coreyti/showdown": "0.3.1",
    "github:systemjs/plugin-css": "0.1.0",
    "github:LeaVerou/prism": "gh-pages",
    "github:twbs/bootstrap": "3.1.1",
    "github:components/jquery": "2.1.0",
    "npm:voxel-demo": "0.0.1",
    "npm:gl-vao": "0.0.3",
    "npm:gl-buffer": "0.1.2",
    "npm:gl-tile-map": "0.3.0",
    "npm:ndarray-ops": "1.1.1",
    "npm:ndarray-fill": "0.1.0",
    "github:jspm/nodelibs": "0.0.2",
    "npm:gl-matrix": "2.0.0",
    "npm:gl-now": "0.0.4",
    "npm:ao-mesher": "0.2.10",
    "npm:ao-shader": "0.2.3",
    "npm:gl-shader": "0.0.6",
    "npm:ndarray": "1.0.15",
    "npm:webglew": "0.0.0",
    "npm:tile-mip-map": "0.2.1",
    "npm:typedarray-pool": [
      "0.1.2",
      "1.0.2"
    ],
    "npm:glsl-exports": "0.0.0",
    "npm:brfs": "0.0.5",
    "npm:uniq": [
      "0.0.2",
      "1.0.1"
    ],
    "npm:cwise": "0.3.4",
    "npm:game-shell": "0.1.4",
    "npm:gl-texture2d": "0.1.12",
    "npm:iota-array": [
      "0.0.1",
      "1.0.0"
    ],
    "npm:cwise-compiler": [
      "0.0.0",
      "0.1.0"
    ],
    "npm:greedy-mesher": "1.0.2",
    "npm:bit-twiddle": [
      "0.0.2",
      "1.0.2"
    ],
    "npm:dup": [
      "0.0.0",
      "1.0.0"
    ],
    "npm:glsl-tokenizer": [
      "0.0.8",
      "0.0.2"
    ],
    "npm:ndarray-downsample2x": "0.1.1",
    "npm:through": [
      "2.2.7",
      "2.3.4",
      "1.1.2"
    ],
    "npm:falafel": "0.1.6",
    "npm:escodegen": "0.0.17",
    "npm:glsl-parser": "0.0.5",
    "npm:domready": "0.2.13",
    "npm:lower-bound": "0.0.1",
    "npm:cwise-parser": "0.0.1",
    "npm:ndarray-fft": "0.1.0",
    "npm:ndarray-scratch": "0.0.1",
    "npm:esprima": "1.2.2",
    "npm:invert-hash": "0.0.0",
    "npm:vkey": "0.0.2",
    "npm:estraverse": "0.0.4",
    "npm:inherits": "2.0.1",
    "npm:base64-js": "0.0.4",
    "npm:ieee754": "1.1.3",
    "npm:Base64": "0.2.1",
    "github:systemjs/plugin-json": "master"
  }
});

