# unwrap-dir
unwrap-dir removes top-level wrapping directories.

[![Build status](https://travis-ci.org/michaelrhodes/unwrap-dir.svg?branch=master)](https://travis-ci.org/michaelrhodes/unwrap-dir)

## install
```sh
$ npm install unwrap-dir
```

## example
It’s often the case that you extract an archive and find its contents wrapped in a single directory. unwrap-dir can be used to rectify this annoyance.

```sh
some-folder
└─┬ wrapping-folder
  ├── one
  ├── two
  └── three
```

```js
var unwrap = require('unwrap-dir')

unwrap('./some-folder', function (err, unwrapped) {
  console.log(unwrapped)
  > true
})
```

```sh
some-folder
├── one
├── two
└── three
```

## license
[MIT](http://opensource.org/licenses/MIT)
