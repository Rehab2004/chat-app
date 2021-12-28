import  firebase from 'firebase/app'

import 'firebase/firestore'

import 'firebase/auth'

import 'firebase/storage'

  // Your web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyCINPgk8MxXgIrwRPBspFy9wGJY3g0GVzw",
    authDomain: "my-chat-4fc2c.firebaseapp.com",
    projectId: "my-chat-4fc2c",
    databaseURL: "https://my-chat-4fc2c-default-rtdb.firebaseio.com/",
    storageBucket: "my-chat-4fc2c.appspot.com",
    messagingSenderId: "553111058067",
    appId: "1:553111058067:web:0fc373a397ac298e7f3f66"
  };

  // Initialize Firebase
  firebase.initializeApp(config);

  
  export const auth =firebase.auth;
 export const storage =firebase.storage;
 export const firestore=firebase.firestore
  
  export default firebase