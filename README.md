# generator-prestashop [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> One-liner command to download and install any version of PrestaShop 

This Yeoman generator bootstraps a fresh PrestaShop store in seconds. It's kind of a hacky thing, but it works and you'll save some precious time if you often need to install PrestaShop stores.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-prestashop using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)):

```bash
npm install -g yo
npm install -g generator-prestashop
```

Then let your computer do the rest :tada: :

```bash
yo prestashop
```

I have NOT tested this with old PrestaShop releases (<1.6). If you find a bug, please let me know via an issue/PR.

## Notes
- Run this command at the DocumentRoot of your server, or you'll need to change the shop's physical_uri in the `shop_url` table
- The installation script will fail if you're running MySQL 5.7, cf. https://github.com/PrestaShop/PrestaShop/pull/4507

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
