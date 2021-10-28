/*var texto = document.addEventListener('keypress', function(e){
    if(e.which == 13){
      enviar();
      
    }
  }, false);

function enviar(){

    
    var texto = document.getElementById('texto')
    var conversa = [];

    conversa.push({
        nome: 'thiago',
        resposta: texto.value
    })


    conversa.map(function(val){
        var container = document.getElementById('container');
        container.innerHTML+=`

        <p>`+val.nome+`: `+ val.resposta+` </p>


    `

    
    })
    document.getElementById('texto').focus()

   
}
*/



var email = document.getElementById('email')
var password = document.getElementById('senha')
var enviar = document.getElementById('enviar')


var google = document.getElementById('google')

google.addEventListener('click', function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      localStorage.setItem('conectou','correto')
      localStorage.setItem('login', user.displayName)
      localStorage.setItem('email', user.email)
      localStorage.setItem('foto', user.photoURL)
      window.location.href = '/dois.html'
      console.log(user)
      console.log(user.email)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

})



enviar.addEventListener('click', function(){

firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function(result){
    localStorage.setItem('conectou','correto')
    window.location.href = '/dois.html'
    alert('Conectado')

}).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('senha ou email incorreto')
  });

})







function rotornar(){
   if(localStorage.getItem('conectou') == 'correto'){
    var nome = localStorage.getItem('login')
    var email = localStorage.getItem('email')
    var foto = localStorage.getItem('foto')
    var recebe = document.getElementById('recebe')
    var containerCorpo = document.getElementById('containerCorpo')
    recebe.innerHTML+=`
    <div class="container-top" id="tope">
      <div>
          <img style="border-radius: 100px;" src="`+foto+`" width="80px">
      </div>
      <div class="container-sair">
        <div class="container-usuario">
          <p>`+nome+`</p>
          <p>`+email+`</p>
        </div>
        <div class="container-deslogar">
          <button onclick="fechar()">Sair</button>
        </div>
      </div>
    </div>
    
    `
    containerCorpo.innerHTML+=`
    <div class="corpo">

        <div>
        </div>


      <div class="input-enviar">
        <input type="text" id="conversa">
        <label for="arquivo"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera-minus" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="13" r="3" />
        <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h3m9 6v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
        <line x1="15" y1="6" x2="21" y2="6" />
      </svg></label>
        <input type="file" name="arquivo" id="arquivo">
        <button onclick="mandar()">enviar</button>  
      </div>  
    </div>
    
    
    `
   }else{
    window.location.href = '/index.html'
   } 
}




function mandar(){
  const db = firebase.firestore();
  const storage = firebase.storage();
  var conversa = document.getElementById('conversa')
  var arquivo = document.querySelector('[name=arquivo]').files[0]
  var contar = document.querySelectorAll('#contador')
  var nomeUser = localStorage.getItem('bancoDados')
  var c = 0;
 
  if(arquivo == null && conversa.value != ''){
    
            console.log(contar.length)
        while(c <= contar.length){
        
          localStorage.setItem('contador', c)
        c++
        }

        
        db.collection(nomeUser).add({
          nome: nomeUser,
          conversa: conversa.value,
          contador: parseInt(localStorage.getItem('contador')),
          imagem: localStorage.getItem('foto'),
          urlImg: localStorage.getItem('uploadImagem'),
          senha: localStorage.getItem('senhaGrupo')
        })

  }else{
              const uploadTask = storage.ref('documentos/' + arquivo.name).put(arquivo)
              uploadTask.on('state_changed',(snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalByte) * 1;

              },
              function(error){

              },

              function(){
                storage.ref('documentos/' + arquivo.name).getDownloadURL().then((url)=>{
                  var conversa = document.getElementById('conversa')
                  while(c <= contar.length){
              
                    localStorage.setItem('contador', c)
                  c++
                  }
                
                  db.collection(nomeUser).add({
                    nome: nomeUser,
                    conversa: conversa.value,
                    contador: parseInt(localStorage.getItem('contador')),
                    imagem: localStorage.getItem('foto'),
                    senha: localStorage.getItem('senhaGrupo'),
                    urlImg: url
                  })
                })

                
              }
              )
            
 
   


              
  

    //alert('enviado com sucesso!!')
    document.querySelector('[name=arquivo]').value = '';


  }

  
  
  

  
  conversa.value = ''
  document.getElementById('conversa').focus()

 
}

function fechar(){


  firebase.auth().signOut().then(() => {

    

    alert('desconectou');
    localStorage.removeItem('conectou')
    localStorage.removeItem('email')
    localStorage.removeItem('contador')
    window.location.href = 'https://login-5410d.web.app/'
  }).catch((error) => {
    // An error happened.
  });
    
}




