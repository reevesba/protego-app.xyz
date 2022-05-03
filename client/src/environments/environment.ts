// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import pkg from '../../package.json';

export const environment = {
  appName: 'Protego',
  envName: 'DEV',
  production: false,
  test: false,
  apiUrl: 'http://localhost/api',
  i18nPrefix: '',
  versions: {
    app: pkg.version,
    angular: pkg.dependencies['@angular/core'],
    ngrx: pkg.dependencies['@ngrx/store'],
    material: pkg.dependencies['@angular/material'],
    bootstrap: pkg.dependencies.bootstrap,
    rxjs: pkg.dependencies.rxjs,
    ngxtranslate: pkg.dependencies['@ngx-translate/core'],
    fontAwesome: pkg.dependencies['@fortawesome/fontawesome-free'],
    angularCli: pkg.devDependencies['@angular/cli'],
    typescript: pkg.devDependencies['typescript'],
    cypress: pkg.devDependencies['cypress'],
    eslint: pkg.devDependencies['eslint']
  }
};