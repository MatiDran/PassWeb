
window.onload = function() {

    function recoverHTML(){
        var lengthPass = document.getElementById("passlength")
        var lowers = document.getElementById("Lowers")
        var capitals = document.getElementById("Capitals")
        var digits = document.getElementById("Digits")
        var specials = document.getElementById("Specials")
        var viewerPanel = document.getElementById("viewerPanel")
        var login = document.getElementById("loginPanel")
        

        if(localStorage.lengthPass) {lengthPass.value = localStorage.lengthPass}
        if(localStorage.lowers   == "true") { lowers.checked    = true } else{ lowers.checked = false }
        if(localStorage.capitals == "true") { capitals.checked  = true } else{ capitals.checked = false }
        if(localStorage.digits   == "true") { digits.checked    = true } else{ digits.checked = false }
        if(localStorage.specials == "true") { specials.checked  = true } else{ specials.checked = false }
        if(localStorage.viewer   == "true") { viewerPanel.style.width = "200px"}
        if(localStorage.login    == "true") {login.style.width = "200px"}

        console.log(localStorage.userId)
        if(localStorage.userId != "0"){//jeśli zalogowany
            document.querySelector('.loged').style.display='block';
            document.querySelector('.notloged').style.display='none';
        }
        
    }

    recoverHTML();

    var lengthPass = document.getElementById("passlength")
    lengthPass.addEventListener('input',(e)=>{
        localStorage.setItem("lengthPass",lengthPass.value)
    })
    var lowers = document.getElementById("Lowers")
    lowers.addEventListener('change', (e)=>{
        localStorage.setItem("lowers",lowers.checked)
    })
    var capitals = document.getElementById("Capitals")
    capitals.addEventListener('change', (e)=>{
        localStorage.setItem("capitals",capitals.checked)
    })
    var digits = document.getElementById("Digits")
    digits.addEventListener('change', (e)=>{
        localStorage.setItem("digits",digits.checked)
    })
    var specials = document.getElementById("Specials")
    specials.addEventListener('change', (e)=>{
        localStorage.setItem("specials",specials.checked)
    })
    

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


    const loginButton = document.querySelector('#loginButton')
    loginButton.addEventListener('click',(e) =>{
        localStorage.setItem("login","true")
        document.getElementById("loginPanel").style.width = "200px";
    })

    const closeButton = document.querySelector('#closeButton')
    closeButton.addEventListener('click',(e) =>{
        localStorage.setItem("login","false")
        document.getElementById("loginPanel").style.width = "0";
    })
// pulling data from form on site to form in our chrome extension (next step : use event listener on submit button)
    const pullData = document.querySelector('#pullBtn')

   

    pullData.addEventListener('click',(e) =>{

        chrome.tabs.query({currentWindow: true,active: true},
            function(tabs){// pulling data from form 
         link= tabs[0].url;     

            })

            // pasting data to form in chrome extension
        document.getElementById("stronaZapis").value=link;
       // document.getElementById("loginZapis").value=emvalue;
       // document.getElementById("hasloZapis").value=paswd;
       const scriptToRun = `
           var values = [];
           var inputFields = document.getElementsByTagName('input');
           for (var i = 0; i < inputFields.length; i++) {
               values.push(inputFields[i].value);
           }
           values;`;  //all this code will be run on the tab page
                      //and the array "values" will be returned.
   
       chrome.tabs.executeScript({
         code: scriptToRun 
       }, (result) => {
   
          console.log( `There are: ${result[0].length} inputs, with these values: <ol><li>${result[0].join("<li>")}`);  

          // crop data from console put it in right place 
       });
       

    })


    chrome.runtime.sendMessage({command:"checkAuth"},(response)=>{
console.log(response);
if(response.status=='succes'){
    document.querySelector('.loged').style.display='block';
}
else{
    document.querySelector('.notloged').style.display='block';

}

    })
    const submitButton = document.querySelector('#submitButton')
    const registerButton = document.querySelector('#registerButton')

    submitButton.addEventListener('click',(e) =>{
       var Useremail =  document.getElementById("usremail").value;
       var Userpassword =  document.getElementById("usrpassword").value;

       chrome.runtime.sendMessage({command:"loginUser",data:{e: Useremail,p: Userpassword}},(response)=>{
          
          if(response.status=='succes')
          {
            document.querySelector('.loged').style.display='block';
            document.querySelector('.notloged').style.display='none';
            document.getElementById("loginPanel").style.width = "0";
              // event po poprawnym zalogowaniu 
            //localStorage.setItem("UserId",response.user)
            localStorage.setItem("login","false")
            localStorage.setItem("userId",response.message.uid)
            localStorage.setItem("haslo",Userpassword)
          }
          else{
          // event po niepoprawnym zalogowaniu 
          
          }
      });

    })
    logoutButton.addEventListener('click',(e) =>{
        document.querySelector('.loged').style.display='none';
        document.querySelector('.notloged').style.display='block';
        chrome.runtime.sendMessage({command:"logoutAuth"},(response)=>{
            console.log(response);
            localStorage.setItem("userId","0")
            localStorage.setItem("haslo","0")
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

     const bazaButton = document.querySelector('#baza')
     bazaButton.addEventListener('click',(e) => {
        localStorage.setItem("viewer","true")
        document.getElementById("viewerPanel").style.width = "200px";
     })

     const backToGenerator = document.querySelector('#backToGenerator')
     backToGenerator.addEventListener('click',(e) =>{
        localStorage.setItem("viewer","false")
        document.getElementById("viewerPanel").style.width = "0px";
     })

     zapiszSideButton.addEventListener('click',(e)=>{
        //localStorage.setItem("login","true")
        document.getElementById("savePanel").style.width = "200px";
        var hasloZapis = document.getElementById("hasloZapis");
        hasloZapis.value = outputPassword.textContent
     })

     closeButtonSave.addEventListener('click',(e)=>{
        //localStorage.setItem("login","true")
        document.getElementById("savePanel").style.width = "0px";
     })

     zapiszButton.addEventListener('click',(e)=>{
        //@MATEUSZ tutaj wywołujesz
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



