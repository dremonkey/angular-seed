Particle Angular Seed
---------------------

Simple Angular Seed for my client side needs.

Usage
--------

- ```npm install``` to install node dependencies
- ```bower install``` to install bower components
- ```grunt serve``` to start the development server
- ```grunt serve:dist``` to run the distribution build task and start the server

Application Architecture [work in progress]
--------
Application architecture follows this [styleguide](http://toddmotto.com/opinionated-angular-js-styleguide-for-teams/) pretty closely. Rules being used/followed listed below:

#### General
- Module method functions
- Reserve $ or $$ for internal angular objects/functions only
- Inject Angular providers/objects before custom ones
- Use the [ng-annotate](https://github.com/olov/ng-annotate) keyword @ngInject to instruct things that need annotating
- Use IIFE to avoid polluting the global namespace

#### Controller Specific
- ControllerAs syntax
- Avoid controller logic in favor of fat services/factories
- Controllers should be class-like, i.e. use this

#### Service Specific
- Services (like controllers) should be class-like
- Should contain "services" or "srv" in the name

#### Factory Specific
- Factory is a pattern/implementation, and shouldn't be part of the provider's name
- Should contain "services" or "srv" in the name
- Create an Object with the same name inside the factory function and return that object

#### Routing Specific
- Resolve promises in the router

Features
--------

#### AngularJS

[Amazing clientside framework](http://angularjs.org/) highly suited for web application development.

#### No jQuery

Trying to avoid it like the plague. Angular and [Lo-dash](http://lodash.com/) provides basically everything you need anyway

#### Bootstrap CSS

CSS framework making it easy to create good looking apps. Uses v3.0.2. Does not use the bootstrap javascript because that requires a dependency on jQuery. Instead uses [Angular UI Bootstrap](http://angular-ui.github.io/bootstrap) for a pure Angular implementation. Bootstrap SASS files can be found in the assets/styles directory.

#### Angular UI Router

[Improves on Angular routing](https://github.com/angular-ui/ui-router)

#### Restangular

[Improves on Angular resources](https://github.com/mgonto/restangular) to make it easier to have Angular interact with standard REST APIs.

#### Grunt

Workhorse that takes the pain out of getting your app up and running and ready for production. Among other things I use [grunt-bower-install](https://github.com/stephenplusplus/grunt-bower-install) to make sure all my bower components are included automagically, [grunt-angular-templates](https://github.com/ericclemmons/grunt-angular-templates) to precompile all angular templates, [grunt-ngmin](https://github.com/btford/grunt-ngmin) so that I can be lazy and not have to use the min-safe AngularJS syntax, and [grunt-usemin](https://github.com/yeoman/grunt-usemin) to concat/minify etc.

#### Karma

Spectacular Test Runner for JavaScript. @TODO Need to make better use of this.
