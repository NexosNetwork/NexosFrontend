export const config = {
  apiUrl: 'http://ui-lib-demo-api.herokuapp.com',
  authRoles: {
    sa: ['SA'], // Only Super Admin has access
    admin: ['SA', 'Admin'], // Only SA & Admin has access
    editor: ['SA', 'Admin', 'Editor'], // Only SA & Admin & Editor has access
    user: ['SA', 'Admin', 'Editor', 'User'], // Only SA & Admin & Editor & User has access
    guest: ['SA', 'Admin', 'Editor', 'User', 'Guest'] // Everyone has access
  },
  // Add Firebase configuration
  firebaseConfig: {
    apiKey: "your-api-keyAIzaSyDv8E92a_qW9ChS9S7ya2-qFNHA0k-gFMo",
    authDomain: "nexosecomsys.firebaseapp.com",
    projectId: "nexosecomsys",
    storageBucket: "nexosecomsys.firestorage.app",
    messagingSenderId: "813224788544",
    appId: "1:813224788544:web:4fa5197476a57eef6bd5a5",
    measurementId: "G-BY4HTL95Q8" 
  }
}