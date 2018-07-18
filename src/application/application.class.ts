import * as http from 'http'

import { Controller } from '../controller/controller.class'
import { InjectionClass } from '../injector/injection-class.interface'
import { InjectionSelector } from '../injector/injection-selector.type'
import { InjectionToken } from '../injector/injection-token.class'
import { InjectionType } from '../injector/injection-type.interface'
import { InjectorService } from '../injector/injector.class'
import { RouterService } from '../router/router.class'

import { ControllerInControllerError } from './controller-in-controller-error.class'

export class Application {
  constructor(
    private injectorService: InjectorService,
    private routerService: RouterService,
  ) {}

  static fromInjectorScope(): Application {
    const injector = InjectorService.getMainInstance()
    const app = injector.get(Application)

    if (app != null) {
      return app
    }

    injector.provide(Application, [InjectorService, RouterService])
    injector.provide(RouterService, [InjectorService])

    return injector.get(Application) as Application
  }

  provide<C>(className: InjectionType<C>): void
  provide<C>(className: InjectionClass<C>, dependencies?: InjectionSelector<any>[]): void
  provide<C>(className: InjectionClass<C>|InjectionType<C>, dependencies?: InjectionSelector<any>[]): void {
    this.injectorService.provide(className as InjectionClass<C>, dependencies)
  }

  declare<C extends Controller>(
    className: InjectionClass<C>|InjectionType<C>,
    dependencies: InjectionSelector<any>[] = [],
  ) {
    for (const dependency of dependencies) {
      if (this.routerService.isRegistered(dependency)) {
        throw new ControllerInControllerError(dependency as InjectionClass<any>, className as InjectionClass<any>)
      }
    }

    this.injectorService.provide(className as InjectionClass<C>, dependencies, false)
    this.routerService.register(className)
  }

  start() {
    const config = this.getConfiguration()

    if (config.cors) {
      this.routerService.enableCORS(config.corsOrigins, config.corsHeaders)
    }

    http
      .createServer((request, response) => {
        this.routerService.httpServerMiddleware(request, response)
          .catch(error => {
            console.warn(error)
          })
      })
      .listen(config.port)

    console.info(`Listen on 127.0.0.1:${config.port}`)
  }

  private getConfiguration() {
    const config = this.injectorService.get(APP_CONFIG) == null
      ? {}
      : this.injectorService.get(APP_CONFIG)

    if (config.port == null || typeof config.port !== 'number') {
      config.port = 8080
    }

    if (config.defaultLocale == null) {
      config.defaultLocale = 'en'
    }

    if (config.locales == null || !Array.isArray(config.port)) {
      config.locales = ['en']
    }

    if (config.cors == null || typeof config.cors !== 'boolean') {
      config.cors = true
    }

    if (config.corsHeaders == null || !Array.isArray(config.corsHeaders)) {
      config.corsHeaders = []
    }

    if (config.corsOrigins == null || !Array.isArray(config.corsOrigins)) {
      config.corsOrigins = []
    }

    return config
  }
}

export const APP_CONFIG = new InjectionToken<any>()
