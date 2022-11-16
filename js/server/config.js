// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, child, get, update, ref, onValue } from "firebase/database";

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
    this.fetchData();
  }

  fetchData() {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `logs`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        const data = snapshot.val();
        // console.log("Fetch data from database")
        // console.log(data)
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
      this.disableLogBtn(btn);
      this.fetchData()
      temp.left = data.left + parseInt(localStorage.getItem("left") || 0);
      temp.right = data.right + parseInt(localStorage.getItem("right") || 0);
      temp.up = data.up + parseInt(localStorage.getItem("up") || 0);
      temp.down = data.down + parseInt(localStorage.getItem("down") || 0);

      //Update the data in the firebase database
      const dbRef = ref(getDatabase());
      const updates = {};
      updates['logs'] = temp;
      if (localStorage.length > 1) {
        update(dbRef, updates);
        localStorage.removeItem("left");
        localStorage.removeItem("right");
        localStorage.removeItem("up");
        localStorage.removeItem("down");
        console.log("Updating data to database");
      }
    });
  }

  disableLogBtn(){
    const logBtn = document.getElementById('logBtn');
    logBtn.classList.add('disable');
  }


}

