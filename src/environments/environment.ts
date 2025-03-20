// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

import { config } from "../config";

export const environment = {
  production: false,
  BASIC_URL: "http://nexosbackend-env.eba-pty7wxp4.us-east-1.elasticbeanstalk.com/",
  apiURL: config.apiUrl,
  firebase: {
    apiKey: "AIzaSyDv8E92a_qW9ChS9S7ya2-qFNHA0k-gFMo",
    authDomain: "nexosecomsys.firebaseapp.com",
    projectId: "nexosecomsys",
    storageBucket: "nexosecomsys.firestorage.app",
    messagingSenderId: "813224788544",
    appId: "1:813224788544:web:4fa5197476a57eef6bd5a5",
    measurementId: "G-BY4HTL95Q8"
  },
  shopify: {
    clientId: 'e4d0ca0347ddc5854ece301b1390c132',
    redirectUri: 'http://nexosbackend-env.eba-pty7wxp4.us-east-1.elasticbeanstalk.com/api/shopify/callback',
    scopes: 'read_products,write_products,read_orders'
  }
};