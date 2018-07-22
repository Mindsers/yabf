# Yabf

[![npm](https://img.shields.io/npm/v/yabf.svg?style=flat-square)](https://www.npmjs.com/package/yabf)
[![npm](https://img.shields.io/npm/dt/yabf.svg?style=flat-square)](https://www.npmjs.com/package/yabf)
[![npm](https://img.shields.io/npm/l/yabf.svg?style=flat-square)](https://github.com/Mindsers/yabf/blob/master/LICENSE)

**Yet Another Basic Framework** for NodeJS.

It is a learning experience: I wouldn't use expressjs as usual but learn how to make/code dependency injection, routing, http requests, and other development patterns/paradigms/concepts by myself.

It can be use as a base for server projects. Of course so much things are missing and you will have to develop it yourself or create an issue in this repo.

*Yabf* work either with JavaScript and TypeScript projects.

## Install

To use *Yabf* in your project you have to import it :

```sh
yarn add yabf@latest
```

## Usage

*Yabf* works with controller and services. To load your controllers and services there are two methods in `Application`: `declare` for controllers and `prodive` for services or data.

After declaring all your classes, you have to start the server.

```ts
import { Application } from 'yabf'

import { MailService } from './services/mail-service'
import { MainController } from './controllers/mail-controller'

(function main() {
  const app = Application.fromInjectorScope()

  app.provide(MailService)
  app.declare(MainController)

  app.start()
})()
```

You can ask *Yabf* to inject dependencies into your controllers or services. However, controllers **can't be injected** in other controllers.

```ts
app.provide(MailService)
app.declare(MainController, [MailService])
```

For more details, please refer to the [wiki](https://github.com/Mindsers/yabf/wiki) or [docs files](https://github.com/Mindsers/yabf/tree/master/docs).

## Support

*Yabf* is licensed under an MIT license, which means that it's completely free open source software. Unfortunately, *Yabf* doesn't make it itself. Which will result in many late, beer-filled nights of development for me.

If you're using *Yabf* and want to support the development, please refer to this [post](https://blog.nathanaelcherrier.com/about-me/).

## License

This project is under the MIT License. (see LICENSE file in the root directory)

> MIT License
>
> Copyright (c) 2018 Nathanael CHERRIER
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
