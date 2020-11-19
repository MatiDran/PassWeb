(function() {


    var firebaseConfig = {
        apiKey: "AIzaSyA2d9PD1WxAXcpUART0ayPegfVX7w9ay64",
        authDomain: "keypass-56278.firebaseapp.com",
        databaseURL: "https://keypass-56278.firebaseio.com",
        projectId: "keypass-56278",
        storageBucket: "keypass-56278.appspot.com",
        messagingSenderId: "688316073383",
        appId: "1:688316073383:web:2d2b31b2e20c4b1ea32282"
      };
      firebase.initializeApp(firebaseConfig);

    const formInstance = document.querySelector('#generator');
    const output = document.querySelector('#password');

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
        var passLength = data.passlength
        var numberOfCapitals = data.numberOfCapitals;
        var numberOfDigits = data.numberOfDigits;
        var numberOfSpecials = data.numberOfSpecials;

      
         
   
       
        
      
       
        if(parseInt(numberOfCapitals) + parseInt(numberOfDigits) + parseInt(numberOfSpecials) > parseInt(passLength)) {
            alert("Zbyt krótka długość hasła");
        } else {
            //output.textContent = numberOfCapitals + numberOfDigits + numberOfSpecials + passLength;
            var passwd =  myFunction(passLength,numberOfCapitals,numberOfDigits,numberOfSpecials);
            output.textContent = passwd
        
            var db = firebase.firestore();
            db.collection("pass").doc(passwd).set({
            })
        }

        e.preventDefault();
    })
})();