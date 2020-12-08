
window.onload = function() {

    function recoverHTML(){
        var lengthPass = document.getElementById("passlength")
        var lowers = document.getElementById("Lowers")
        var capitals = document.getElementById("Capitals")
        var digits = document.getElementById("Digits")
        var specials = document.getElementById("Specials")
        var viewerPanel = document.getElementById("viewerPanel")
        var loginPanel = document.getElementById("loginPanel")
        var savePanel = document.getElementById("savePanel")
        

        if(localStorage.lengthPass) {lengthPass.value = localStorage.lengthPass}
        if(localStorage.lowers   == "true") { lowers.checked    = true } else{ lowers.checked = false }
        if(localStorage.capitals == "true") { capitals.checked  = true } else{ capitals.checked = false }
        if(localStorage.digits   == "true") { digits.checked    = true } else{ digits.checked = false }
        if(localStorage.specials == "true") { specials.checked  = true } else{ specials.checked = false }
        
        if(localStorage.saver    == "true") {savePanel.style.width = "200px"}
        if(localStorage.login    == "true") {loginPanel.style.width = "200px"}

        console.log(localStorage.userId)
        if(localStorage.userId != "0"){//jeśli zalogowany
            document.querySelector('.loged').style.display='block';
            document.getElementById('baza').style.display="block"
            document.querySelector('.notloged').style.display='none';
            if(localStorage.viewer   == "true") { viewerPanel.style.width = "200px"}
        } else {
            document.querySelector('.loged').style.display='none';
            document.getElementById('baza').style.display="none"
            document.querySelector('.notloged').style.display='block';
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
            document.getElementById('baza').style.display="block"
            document.getElementById("loginPanel").style.width = "0";
              // event po poprawnym zalogowaniu 
            //localStorage.setItem("UserId",response.user)
            localStorage.setItem("login","false")
            localStorage.setItem("userId",response.message.uid)
            localStorage.setItem("haslo",Userpassword)
            tableCreate();
          }
          else{
          // event po niepoprawnym zalogowaniu 
          
          }
      });

    })
    logoutButton.addEventListener('click',(e) =>{
        document.querySelector('.loged').style.display='none';
        document.querySelector('.notloged').style.display='block';
        document.getElementById('baza').style.display="none"
        chrome.runtime.sendMessage({command:"logoutAuth"},(response)=>{
            console.log(response);
            localStorage.setItem("userId","0")
            localStorage.setItem("haslo","0")
                    var tablePass = document.getElementById("tablePass")
        if(document.contains(tablePass)){
            tablePass.remove()
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

     const bazaButton = document.querySelector('#baza')
     bazaButton.addEventListener('click',(e) => {
        var tablePass = document.getElementById("tablePass")
        if(!document.contains(tablePass)){
            tableCreate();
        }
        localStorage.setItem("viewer","true")
        document.getElementById("viewerPanel").style.width = "200px";
     })

     const backToGenerator = document.querySelector('#backToGenerator')
     backToGenerator.addEventListener('click',(e) =>{
        localStorage.setItem("viewer","false")
        document.getElementById("viewerPanel").style.width = "0px";
     })


     function getSite(okno) {
     chrome.tabs.getSelected(null, function(tab) {
        var currentURL = document.createElement('a')
        currentURL.href=tab.url;
        okno.value = currentURL.hostname
    });
    
    }

     zapiszSideButton.addEventListener('click',(e)=>{
        //localStorage.setItem("login","true")
        localStorage.setItem("saver","true")

        document.getElementById("savePanel").style.width = "200px";
        var hasloZapis = document.getElementById("hasloZapis");
        var stronaZapis = document.getElementById("stronaZapis");
        var loginZapis = document.getElementById("loginZapis");

        hasloZapis.value = outputPassword.textContent
        getSite(stronaZapis);
     })

     closeButtonSave.addEventListener('click',(e)=>{
        //localStorage.setItem("login","true")
        localStorage.setItem("saver","false")
        document.getElementById("savePanel").style.width = "0px";
     })

     zapiszButton.addEventListener('click',(e)=>{
        //@MATEUSZ tutaj wywołujesz

        var hasloZapis = document.getElementById("hasloZapis");
        var stronaZapis = document.getElementById("stronaZapis");
        var loginZapis = document.getElementById("loginZapis");
        var haslo = localStorage.haslo
        
        chrome.runtime.sendMessage({command:"savePassword",data:{hasloMain: localStorage.haslo ,id:localStorage.userId,s:stronaZapis.value,l: loginZapis.value,p: hasloZapis.value}},(response)=>{
          
            if(response.status=='succes')
            {
                hasloZapis.value=""
                stronaZapis.value=""
                loginZapis.value=""
                document.getElementById("savePanel").style.width = "0px";
                
                alert('Hasło zostało zapisane do bazy')
                localStorage.setItem("saver","false")
                tableCreate();
                // event po poprawnym zapisaniu 
             
            }
            else{
                alert('Niestety nie udało się zapisać hasła')
            // event po niepoprawnym zalogowaniu 
            
            }
        });

       
     })

     function tableCreate() {
        var ilosc = 0
        var hasla = new Array()
        var tablePass = document.getElementById("tablePass")
        if(document.contains(tablePass)){
            tablePass.remove()
        }

        chrome.runtime.sendMessage({command:'getCollection', data:{userId: localStorage.userId}}, (response) => {
            if(response.status=='success')
            {
                ilosc = response.message.iloscWierszy;
                hasla = response.message.tabHasel;

                var body = document.getElementById('viewerPanel');
                var tbl = document.createElement('table');
                tbl.style.width = '100%';
                tbl.setAttribute('border', '1');
                tbl.id = "tablePass"
                var tbdy = document.createElement('tbody');
                for (var i = 0; i < 1 + ilosc; i++) {
                  var tr = document.createElement('tr');
                  for (var j = 0; j < 4; j++) {
                    {
                        if(i==0){ //wiersz z labelami
                            var td = document.createElement('td');
                            td.appendChild(document.createTextNode('\u0020'))
                            if(j==0) {td.textContent = "Lp."}
                            if(j==1) {td.textContent = "login"}
                            if(j==2) {td.textContent = "haslo"}
                            if(j==3) {td.textContent = "strona"}
                            tr.appendChild(td)
      
                        } else {
                            var td = document.createElement('td');
                            td.appendChild(document.createTextNode('\u0020'))
                            if(j==0) {td.textContent = i}
                            if(j==1) {td.textContent = hasla[i-1].login}
                            if(j==2) {td.textContent = hasla[i-1].haslo}
                            if(j==3) {td.textContent = hasla[i-1].strona}
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



