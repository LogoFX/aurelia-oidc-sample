import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import oidcConfig from "./open-id-connect-configuration-identity-server";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
  aurelia.use.plugin(PLATFORM.moduleName("aurelia-open-id-connect"), () => oidcConfig);
  aurelia.use.plugin(PLATFORM.moduleName("aurelia-validation"));

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
