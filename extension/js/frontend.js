
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

    
    const formInstance = document.querySelector('#generator');
    const outputPassword = document.querySelector('#password');

    const form = {
        getJSON: (form) => {
            const formData = new FormData(form),
                data = {};

            for (let input of formData.entries()) {
                data[input[0]] = input[1];
            }
            return data;
        },
        isEmpty: (data) => {
            if (data['passlength'] === '') {
                return true;
            }
            return false;
        },
        hasChars: (data, groupname)=>{
            return groupname in data;
        }
    }

    formInstance.addEventListener('submit', (e) => {
        const data = form.getJSON(formInstance);
        var passLength = data.passlength;

        var lowers      = 0; if(data.Lowers){lowers = 1}
        var capitals    = 0; if(data.Capitals){capitals = 1}
        var digits      = 0; if(data.Digits){digits = 1}
        var specials    = 0; if(data.Specials){specials = 1}
        var typeSum = lowers + capitals + digits + specials;

        if(typeSum == 0) {
            alert("Zaznacz przynajmniej jeden rodzaj znaków");
        }else {
            if(typeSum > passLength){
                alert("Zbyt krótka długość hasła");
            } else{
               
            var passwd = myFunction(passLength,lowers,capitals,digits,specials);
            outputPassword.textContent = passwd;
        
            var db = firebase.firestore();
            db.collection("hasla").add({
                login: "brak",
                haslo: passwd
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });



            }
        }

        e.preventDefault();
    })

    
    function copyToClipboard(text) {
        const input = document.createElement('input');
        input.style.position = 'fixed';
        input.style.opacity = 0;
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        document.body.removeChild(input);
      };

    const copyButton = document.querySelector('#copyButton')
    copyButton.addEventListener('click',(e) =>{
        if(outputPassword.textContent != ' '){
            copyToClipboard(outputPassword.textContent)
        }
    })

    const bazaButton = document.querySelector('#baza')
    bazaButton.addEventListener('click',(e) => {
        document.getElementById("viewerPanel").style.width = "200px";
    })


    const loginButton = document.querySelector('#loginButton')
    loginButton.addEventListener('click',(e) =>{
            document.getElementById("loginPanel").style.width = "200px";


    })
    const closeButton = document.querySelector('#closeButton')

    closeButton.addEventListener('click',(e) =>{
       
            document.getElementById("loginPanel").style.width = "0";

    
    })

    const submitButton = document.querySelector('#submitButton')
    const registerButton = document.querySelector('#registerButton')

    submitButton.addEventListener('click',(e) =>{
       

       var Useremail =  document.getElementById("usremail").value;
       var Userpassword =  document.getElementById("usrpassword").value;

       chrome.runtime.sendMessage({command:"loginUser",data:{e: Useremail,p: Userpassword}},(response)=>{
          
          if(response.status=='succes')
          {
              alert(response.message.uid);

              // event po poprawnym zalogowaniu 
          }
          else{
                alert("Niepoprawny email lub hasło")
          }
      });


    })

    registerButton.addEventListener('click',(e) =>{
       

        var Useremail =  document.getElementById("usremail").value;
        var Userpassword =  document.getElementById("usrpassword").value;
 
        chrome.runtime.sendMessage({command:"registerUser",data:{e: Useremail,p: Userpassword}},(response)=>{
           
           if(response.status=='succes')
           {
               alert("Rejestracja powiodła sie");
               
           }
           else{
                 alert("Rejestracja nie powiodła sie")
           }
       });
 
 
     })

     const backToGenerator = document.querySelector('#backToGenerator')
     backToGenerator.addEventListener('click',(e) =>{
        document.getElementById("viewerPanel").style.width = "0px";
     })

     function tableCreate() {
        var ilosc = 0
        var hasla = new Array()

        chrome.runtime.sendMessage({command:'getCollection', data:{collectionName:'hasla'}}, (response) => {
            if(response.status=='success')
            {
                ilosc = response.message.iloscWierszy;
                hasla = response.message.tabHasel;

                var body = document.getElementById('viewerPanel');
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
                
            }
            else{
                  alert("Problem przy wyciągnięciu danych z bazy")
            }
        })
    


        }
        tableCreate() 

}



