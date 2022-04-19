import { default as auth } from '../../auth_config.json';

//use below if throws error
// import auth from '../../auth_config.json';
// import {domain, clientId} from '../../auth_config.json';
// import * as auth from '../../auth_config.json';

//If this throws a error:

//Should not import the named export 'domain' (imported as 'domain') from
//default -exporting module(only default export is available soon) angular

//Change the imports to one of the commented ones
//If that doesn't fix it, use the hardcoded values below


export const environment = {
  production: false,
  apiURL: 'http://localhost:5000',
  auth: {
    // "domain": "dev-beazcaxy.us.auth0.com",
    // "clientId": "6Iewy037OUNolNG9Q7oS1pZCIZ6DakAs",
    // domain,
    // clientId,
    domain: auth.domain,
    clientId: auth.clientId,
    redirectUri: window.location.origin,
  },
};

