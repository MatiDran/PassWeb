window.onload = function() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAiVsuVe2svO5rpE3Pd8cvxbLNzWJl79g8",
    authDomain: "keypass-2b5a9.firebaseapp.com",
    databaseURL: "https://keypass-2b5a9.firebaseio.com",
    projectId: "keypass-2b5a9",
    storageBucket: "keypass-2b5a9.appspot.com",
    messagingSenderId: "608568818489",
    appId: "1:608568818489:web:0e07b7699bea95a884c6e8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

      function tableCreate() {
        var db = firebase.firestore();
        var docRef = db.collection("passwords")
        var ilosc = 0
        var hasla = new Array()

        db.collection("hasla").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log(`${doc.id} => ${doc.data()}`);
              hasla.push(doc.data())
              ilosc++;
          });


          var body = document.getElementsByTagName('body')[0];
          var tbl = document.createElement('table');
          tbl.style.width = '100%';
          tbl.setAttribute('border', '1');
          var tbdy = document.createElement('tbody');
          for (var i = 0; i < 1 + ilosc; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < 3; j++) {
              {
                  if(i==0){ //wiersz z labelami
                      var td = document.createElement('td');
                      td.appendChild(document.createTextNode('\u0020'))
                      if(j==0) {td.textContent = "Lp."}
                      if(j==1) {td.textContent = "login"}
                      if(j==2) {td.textContent = "haslo"}
                      tr.appendChild(td)

                  } else {
                      var td = document.createElement('td');
                      td.appendChild(document.createTextNode('\u0020'))
                      if(j==0) {td.textContent = i}
                      if(j==1) {td.textContent = hasla[i-1].login}
                      if(j==2) {td.textContent = hasla[i-1].haslo}
                      tr.appendChild(td)
                  }
                  
              }
            }
            tbdy.appendChild(tr);
          }
          tbl.appendChild(tbdy);
          body.appendChild(tbl)
        })


        }
        tableCreate() 


      const dupa = document.querySelector('#generator')
      dupa.addEventListener('click',(e) =>{
          if(1 != 2){
            chrome.browserAction.setPopup({popup: "popup.html"});
            window.location.href="popup.html"
          }
      })

      
      /*
      chrome.browserAction.setPopup({popup: "popup.html"});
      window.location.href="popup.html"
      */
}