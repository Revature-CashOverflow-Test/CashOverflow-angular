import { default as auth } from '../../auth_config.json';
export const environment = {
  production: true,
  //apiURL: 'http://cashoverflow2-env.eba-vs9b3n6r.us-east-1.elasticbeanstalk.com',
  apiURL: 'http://localhost:5000',
  auth: {
    // "domain": "dev-beazcaxy.us.auth0.com",
    // "clientId": "6Iewy037OUNolNG9Q7oS1pZCIZ6DakAs",
    // domain,
    // clientId,
    domain: auth.domain,
    clientId: auth.clientId,
    redirectUri: window.location.origin
  }

};
