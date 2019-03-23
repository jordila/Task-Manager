function crearLista() {
    var loginUrl = "http://apitrello.herokuapp.com/list";
    var xhr = new XMLHttpRequest();
    
    //   var userElement = document.getElementById('username'); ;
    
    var listaElement = document.getElementById('lista');
    var lista = listaElement.value;

    xhr.open('POST', loginUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener('load', function() {
var responseObject = JSON.parse(this.response);
      /*    console.log(responseObject); */
      console.log('creamos nueva lista de tareas');
      console.log(responseObject);
      console.log('... y el idlist es : ');
      /* idlist que responde la API tras crear la lista 
       console.log(responseObject.idlist); */

      if (responseObject) {
	   
    } else {
          /*  userIdElement.innerHTML = "No se recibió la autorización por parte de la API"; */
    }
	
    });
    
    var sendObject = JSON.stringify({name: name,})
    
}
