import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyASH0JI0ftfO-GB0ChdOZ4VnaAlbsM7b74",
  authDomain: "recipeapp-4206f.firebaseapp.com",
  databaseURL: "https://recipeapp-4206f.firebaseio.com",
  projectId: "recipeapp-4206f",
  storageBucket: "recipeapp-4206f.appspot.com",
  messagingSenderId: "838035615578",
  appId: "1:838035615578:web:992d13024968efb5e18d63"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fbApp = {
    root:firebase,
  db:firebase.database(),
    auth:firebase.auth(),
    storage:firebase.storage(),
}

export default fbApp;

// const createChat = () => {
//   if (title.trim() !== "") {
//     const newChatID = fbApp.db.ref("chats").push().key;
//     const startMsgID = fbApp.db.ref(`messages/${newChatID}`).push().key;
