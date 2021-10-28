contato();
//exibir();
//rodar();
/*
function exibir() { 
    const db = firebase.firestore();
    var lista = document.getElementById('lista')
    var nomeUsuario = localStorage.getItem('login')
    var foto = localStorage.getItem('foto')
    db.collection(nomeUsuario).orderBy('contador', 'asc').onSnapshot(function(data){
    lista.innerHTML = '';
      data.docs.map(function(val){
        lista.innerHTML+=`
        
       <li id="contador"> <img style="border-radius: 100px; padding: 5px;" src="`+foto+`" width="50px"> `+val.data().conversa+`</li>
        
        `
        
      })
      
    })
  }
*/

  function contato(){
      var contact = prompt('DIGITE O NOME DO GRUPO:');
      var senha = prompt('DIGITE A SENHA DO GRUPO:');
      const db = firebase.firestore();
      var convers = document.getElementById('convers');
      
      localStorage.setItem('bancoDados', contact);   
      localStorage.setItem('senhaGrupo', senha);  
      
      db.collection(contact).orderBy('contador', 'asc').onSnapshot(function(data){
        convers.innerHTML = '';
          data.docs.map(function(val){
            if(val.data().senha == senha){
                var convers = document.getElementById('convers')
                convers.innerHTML+=`
                <li id="contador" style="background-color: #00afb9;"> <img style="border-radius: 100px; padding: 5px;" src="`+val.data().imagem+`" width="50px">  `+val.data().conversa+`  <div id="div`+val.data().contador+`" class="divReset"> <img class="imgFoto" id="escondeImagem`+val.data().contador+`" src="`+val.data().urlImg+`" width="200px" onerror="this.style.display='none'" onclick="zoomModal(`+val.data().contador+`)"> </div>  </li>
    
                
               
                `   
            }else{
                alert('digite a senha correta do grupo para ver as conversas ...')
                window.location.href = 'https://login-5410d.web.app/'
            }  
            
          })
        })
  }

function zoomModal(a){
  var img = document.getElementById('escondeImagem'+a)
  var div = document.getElementById('div'+a)
  if(img.style.transform != 'scale(1.5)'){
    div.style.display = 'flex'
    div.style.position = 'fixed'
    div.style.left = '0'
    div.style.bottom = '0'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    div.style.width = '100%'
    div.style.background = 'rgba(0, 0, 0, 0.5)'
    div.style.minHeight = '100vh'
    img.style.transform = 'scale(1.5)'
    div.style.cursor = 'zoom-out'
  }else{
    div.style.display = 'flex'
    div.style.position = 'static'
    div.style.justifyContent = 'end'
    div.style.alignItems = 'end'
    div.style.width = 'auto'
    div.style.background = 'none'
    div.style.minHeight = 'auto'
    img.style.transform = 'none'
    div.style.cursor = 'zoom-in'
  }
  
}


/*
  function rodar(){


    const db = firebase.firestore();
    db.collection("Tw10").onSnapshot(function(data){
        
        data.docs.map(function(val){
            console.log(val.data().docs)
                db.collection("Tw10").doc(val.id).delete()
        
        })
        
    })
    
    
    alert('rodando ..')
  }
*/

  