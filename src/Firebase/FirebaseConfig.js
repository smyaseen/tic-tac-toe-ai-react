import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCrkSzEl_Qjp0SBP_AoE014U_3ghHFa8yw',
  authDomain: 'tic-tac-toe-ai-react.firebaseapp.com',
  projectId: 'tic-tac-toe-ai-react',
  storageBucket: 'tic-tac-toe-ai-react.appspot.com',
  messagingSenderId: '516882793205',
  appId: '1:516882793205:web:4d79148cdc4997d239fbbc',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
