
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
                outputPassword.textContent = myFunction(passLength,lowers,capitals,digits,specials);
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
            document.getElementById("loginPanel").style.width = "250px";

        
    })
    const closeButton = document.querySelector('#closeButton')

    closeButton.addEventListener('click',(e) =>{
       
            document.getElementById("loginPanel").style.width = "0";

        
    })

    const submitButton = document.querySelector('#submitButton')

    submitButton.addEventListener('click',(e) =>{
       

       var Useremail =  document.getElementById("usremail").value;
       var Userpassword =  document.getElementById("usrpassword").value;

       chrome.runtime.sendMessage({command:"loginUser",data:{e: Useremail,p: Userpassword}},(response)=>{
          
          if(response.status=='succes')
          {
              alert(response.message.uid);
          }
          else{
                alert("not loged in")
          }
      });


    })
   
      



