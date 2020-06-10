import firebase from 'firebase/app'
import 'firebase/database'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAM-gW4VpBSos4SOTa6GwcJSBm9S7Sf9Xc',
  authDomain: 'hci-grupni.firebaseapp.com',
  databaseURL: 'https://hci-grupni.firebaseio.com',
  projectId: 'hci-grupni',
  storageBucket: 'hci-grupni.appspot.com',
  messagingSenderId: '646503664862',
  appId: '1:646503664862:web:d7ed6e05363438c816864f',
  measurementId: 'G-Z0XYN3Q6P3',
});

export const db = app.database();
export const artistsDB = db.ref('artists');
export const paintingsDB = db.ref('paintings');
