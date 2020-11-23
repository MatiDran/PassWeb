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
            firebase.auth().signInWithEmailAndPassword("asdloe@op.pl","password123").catch(function(error){
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
        return true;
    });
