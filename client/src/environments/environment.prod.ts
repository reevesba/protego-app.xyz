import pkg from '../../package.json';

export const environment = {
  appName: 'Protego',
  envName: 'PRD',
  production: true,
  stage: false,
  test: false,
  apiUrl: 'https://protego-app.xyz/api',
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