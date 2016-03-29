# generator-prestashop [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Generate a PrestaShop store

This generator scaffolds a fresh PrestaShop store. It's kind of a hacky thing (for now), but it will save you some precious time if you often need to bootstrap a store.
## Installation

First, install [Yeoman](http://yeoman.io) and generator-prestashop using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-prestashop
```

Then generate your new project:

```bash
yo prestashop
```

You can choose the release of your choice. When the scaffolding is complete, just put the folder on a webserver and you can install everything from your browser (CLI installation is coming);

## TODO
- [x] Working `yo prestashop`
- [ ] Add a progress bar when extracting the archive
- [x] Select the PrestaShop version to download
- [ ] Scrap the release numbers instead of hardcode them :unamused:
- [ ] Skip the browser installation process

## License

MIT © [Marc Picaud](https://github.com/marcpicaud)


[npm-image]: https://badge.fury.io/js/generator-prestashop.svg
[npm-url]: https://npmjs.org/package/generator-prestashop
[travis-image]: https://travis-ci.org/marcpicaud/generator-prestashop.svg?branch=master
[travis-url]: https://travis-ci.org/marcpicaud/generator-prestashop
[daviddm-image]: https://david-dm.org/marcpicaud/generator-prestashop.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/marcpicaud/generator-prestashop
[coveralls-image]: https://coveralls.io/repos/marcpicaud/generator-prestashop/badge.svg
[coveralls-url]: https://coveralls.io/r/marcpicaud/generator-prestashop
