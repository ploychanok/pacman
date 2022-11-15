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
        // console.log(snapshot.val());
        const data = snapshot.val();
        this.getData(data);
      } else {
        console.log("No data available");
      }
    })
      .catch((error) => {
        console.error(error);
      });


  }

  getData(data) {
    let temp = {
      left: 0,
      right: 0,
      up: 0,
      down: 0
    }

    const btn = document.getElementById("sendData");
    if (btn === undefined || btn === null) {
      return;
    }

    btn.addEventListener('click', () => {
      //do sth;
      temp.left = data.left + parseInt(localStorage.getItem("left"));
      temp.right = data.right + parseInt(localStorage.getItem("right"));
      temp.up = data.up + parseInt(localStorage.getItem("up"));
      temp.down = data.down + parseInt(localStorage.getItem("down"));
      console.log(temp)

      // firebase.database().ref('logs').set({
      // });
    });




    // console.log(data);
  }


}

