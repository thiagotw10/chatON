/*function rodar(){


    const db = firebase.firestore();
    var login = localStorage.getItem('login')
    db.collection(login).onSnapshot(function(data){
        
        data.docs.map(function(val){
            console.log(val.data().docs)
                db.collection(login).doc(val.id).delete()
        
        })
        
    })
    
    
    alert('rodando ..')
  }

  rodar();
  */