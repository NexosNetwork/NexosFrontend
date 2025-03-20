import { config } from "config";

export const environment = {
  production: true,
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
    clientId: 'your_shopify_client_id',
    redirectUri: 'https://your-production-domain.com/dashboard/connect/shopify/callback',
    scopes: 'read_orders'
    // Add any other Shopify-specific configuration here
  }
};