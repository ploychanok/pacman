// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export class Config {
  init() {
    this.firebase();
  }

  firebase() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyD_jtI27CZljNW-3_vVJcNMS5f7b3-5OHs",
      authDomain: "pacman-naist.firebaseapp.com",
      databaseURL: "https://pacman-naist-default-rtdb.asia-southeast1.firebasedatabase.app/",
      projectId: "pacman-naist",
      storageBucket: "pacman-naist.appspot.com",
      messagingSenderId: "636233029371",
      appId: "1:636233029371:web:154bf06686de07a050025e"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);


    const dbRef = ref(getDatabase());
    get(child(dbRef, `logs`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    const btn = document.getElementById("sendData");
    btn.addEventListener('click', () => {
      //do sth;
      data.left = data.left + parseInt(localStorage.getItem("left"));
      data.right = data.right + parseInt(localStorage.getItem("right"));
      data.up = data.up + parseInt(localStorage.getItem("up"));
      data.down = data.down + parseInt(localStorage.getItem("down"));
      console.log(data)

      // firebase.database().ref('logs').set({
      // });
    });
  }


}

