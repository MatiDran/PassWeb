var firebaseConfig = {
    apiKey: "AIzaSyAiVsuVe2svO5rpE3Pd8cvxbLNzWJl79g8",
    authDomain: "keypass-2b5a9.firebaseapp.com",
    databaseURL: "https://keypass-2b5a9.firebaseio.com",
    projectId: "keypass-2b5a9",
    storageBucket: "keypass-2b5a9.appspot.com",
    messagingSenderId: "608568818489",
    appId: "1:608568818489:web:0e07b7699bea95a884c6e8"
  };

  firebase.initializeApp(firebaseConfig);

  console.log(firebase);


  chrome.runtime.onMessage.addListener((msg,sender,response)=>{
        if(msg.command=='logoutAuth'){
                fiirebase.auth().signOut().then(function(){

                        response({type:"un-auth",status:"succes",message:true});


                },function(error){
                    response({type:"un-auth",status:"false",message:error});
                }
                );

        }  
        if(msg.command=='checkAuth'){
            var user=firebase.auth().currentUser;
            if(user){
                response({type:"auth",status:"succes",message:user});
            }
            else {
                response({type:"auth",status:"no-auth",message:false});

            }
        } 
        if(msg.command=='loginUser')
        {
            console.log(msg.data);
            var email=msg.data.e;
            var password=msg.data.p;
            firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
                var errorCode=error.code;
                var errorMassege=error.message;
                console.log(error);
                response({type:"auth",status:"error",message:error});


            });
            firebase.auth().onAuthStateChanged(function(user){
                if(user)
                {
                    console.log(user);
                    response({type:"auth",status:"succes",message:user});

                }
                else{
                    //no loged in user
                }
            });
        }
        if(msg.command=='savePassword')
        {
            
            var hasloMain = msg.data.hasloMain
            var saveLogin = msg.data.l
            var savePassword = msg.data.p
            var saveSite = msg.data.s

            var password = String(CryptoJS.AES.encrypt(savePassword, hasloMain))

            var UID = msg.data.id

            var db = firebase.firestore();
            db.collection(UID).doc().set({
                login: saveLogin,
                haslo: password,
                strona: saveSite
                
            }).then(() => {
                response({type:"save",status:"succes"})
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                response({type:"save",status:"error",message:error});

            });
            
        }

        if(msg.command=='registerUser')
        {   var email=msg.data.e;
            var password=msg.data.p;

                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                    
                        response({type:"register",status:"succes"});

                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        response({type:"register",status:"error",message:error});

                    });

        }
        if(msg.command=='getCollection'){
            
            var db = firebase.firestore();
            var userId = msg.data.userId;
            var hasloMain = msg.data.hasloMain;

            var ilosc = 0;
            var hasla = new Array();


            db.collection(userId).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var decodedData = {
                        login:doc.data().login,
                        haslo:(CryptoJS.AES.decrypt(doc.data().haslo, hasloMain)).toString(CryptoJS.enc.Utf8),
                        strona:doc.data().strona,
                        docId:doc.id
                    }
                    hasla.push(decodedData)
                    ilosc++;
                });
                response({type:'collection', status:'success', message:{iloscWierszy:ilosc, tabHasel: hasla }})
            })
            .catch((error) =>{
                var errorCode = error.code;
                var errorMessage = error.message;
                response({type:'collection',status:"error",message:error});
            })


        }
        if(msg.command == 'updatePassword'){

            var hasloMain = msg.data.hasloMain
            var saveLogin = msg.data.l
            var savePassword = msg.data.p
            var saveSite = msg.data.s
            var docId = msg.data.documentId
            var UID = msg.data.id
            var password = String(CryptoJS.AES.encrypt(savePassword, hasloMain))

            var db = firebase.firestore();
            db.collection(UID).doc(docId).update({
                login: saveLogin,
                haslo: password,
                strona: saveSite
                
            }).then(() => {
                response({type:"update",status:"succes"})
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                response({type:"update",status:"error",message:error});
            });
        }
        if(msg.command == 'deletePassword'){

            var docId = msg.data.documentId
            var UID = msg.data.id

            var db = firebase.firestore();
            db.collection(UID).doc(docId).delete(

            ).then(() => {
                response({type:"delete",status:"succes"})
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                response({type:"delete",status:"error",message:error});
            });


        }

        return true;
    });
