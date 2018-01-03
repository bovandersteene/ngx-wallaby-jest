# Integrate wallaby with jest and angular!
With the use of [jest-preset-angular](https://www.npmjs.com/package/jest-preset-angular) ' we can run our angular test through jest.
But we still have a nice tool named: [wallabyjs](https://wallabyjs.com/). With this plugin you can add jest to your angular implementation

Described implementation: [Angular + Jest + Wallabyjs why it is the ideal combination! And how to configure](https://medium.com/@bo.vandersteene/angular-jest-wallabyjs-why-it-is-the-ideal-combination-and-how-to-configure-b4cbe2eff4b3)

Example: [angular-cli-jest-wallaby](https://github.com/bovandersteene/angular-cli-jest-wallaby)

## How to use
``npm install ngx-wallaby-jest``

## Example configuration file
````
const ngxWallabyJest = require('ngx-wallaby-jest');

module.exports = function (wallaby) {
    return {
        files: [
            {pattern: 'tsconfig.json', load: false},
            {pattern: 'jest.config.js', load: false},
            {pattern: 'src/setupJest.ts', load: false},
            {pattern: 'src/tsconfig.spec.json', load: false},
            {pattern: 'src/app/**/*.ts', load: false},
            {pattern: 'test/**/*.ts', load: false},
            {pattern: 'spec-bundle-wallaby.js', load: false},
            {pattern: 'src/app/**/*.spec.ts', ignore: true},
            {pattern: 'src/app/**/*.d.ts', ignore: true},
        ],
        tests: ['src/app/**/*.spec.ts'],
        env: {
            kind: 'electron',
            type: 'node',
            runner: 'node'
        },
        preprocessors: {
            'src/**/*.ts': ngxWallabyJest,
        },
        testFramework: 'jest',
        setup: function (wallaby) {
            var jestConfig = require('./jest.config.js');
            // jestConfig.globals = { "__DEV__": true };
            wallaby.testFramework.configure(jestConfig);
        },
        debug: true
    };
};
```
