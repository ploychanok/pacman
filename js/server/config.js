// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export class Config {
  init() {
    this.firebase();
  }

  // getData() {
  //   console.log('hello get');
  // }

  // sendData() {
  //   console.log('hello send');
  // }

  firebase() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyD_jtI27CZljNW-3_vVJcNMS5f7b3-5OHs",
      authDomain: "pacman-naist.firebaseapp.com",
      databaseURL: "https://pacman-naist-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "pacman-naist",
      storageBucket: "pacman-naist.appspot.com",
      messagingSenderId: "636233029371",
      appId: "1:636233029371:web:154bf06686de07a050025e"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  }
}

