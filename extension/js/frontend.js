(function() {


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
            output.textContent = myFunction(passLength,numberOfCapitals,numberOfDigits,numberOfSpecials);
        }

        e.preventDefault();
    })
})();