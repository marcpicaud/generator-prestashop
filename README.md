# generator-prestashop [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Generate a PrestaShop store

This generator scaffolds a fresh PrestaShop store. It's kind of a hacky thing (for now), but it will save you some precious time if you often need to bootstrap a store.

## Requirements
The installation script will fail if you're running MySQL 5.7, cf. https://github.com/PrestaShop/PrestaShop/pull/4507

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

You can choose the release version on the prompt. I have NOT tested the CLI installer with every one of them. If you find a bug, please let me know via an issue/PR.

## TODO
- [x] Working `yo prestashop`
- [ ] Add a progress bar when extracting the archive
- [x] Select the PrestaShop version to download
- [ ] Scrap the release numbers instead of hardcode them :unamused:
- [x] Skip the browser installation process

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
