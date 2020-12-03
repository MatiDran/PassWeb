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
            var user=firebase.autch().currentUser;
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
            var collectionName = msg.data.collectionName;

            var ilosc = 0;
            var hasla = new Array();

            db.collection(collectionName).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data()}`);
                    hasla.push(doc.data())
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

        return true;
    });
