// basado en el jwt-vanilla.js de JonathanMH 
// à la https://jonathanmh.com/example-json-web-tokens-vanilla-javascript/
// vamos a  guardar el token recibido de la APItrello en nuestro navegador localStorage

// make the request to the login endpoint
function getUser() {
  var loginUrl = "http://apitrello.herokuapp.com/users";
  var xhr = new XMLHttpRequest();
  var userElement = document.getElementById('username');
  var passwordElement = document.getElementById('password');
  var tokenElement = document.getElementById('token');
  var user = userElement.value;
  var password = passwordElement.value;

  xhr.open('POST', loginUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.addEventListener('load', function() {
      var responseObject = JSON.parse(this.response);
      /*    console.log(responseObject); */
      console.log('creamos usuari@ / contraseña ');
      console.log(responseObject);
      console.log('... y le user_Id es : ');
      /* var userID */
      console.log(responseObject.id);
      localStorage.setItem('userId', responseObject.id);
      /* recuperar userID de la respuesta AJAX de login
      /* para recuperarlo a posteriori, localStorage.setItem('token'); */
      if (responseObject) {
	   
    } else {
          /*  userIdElement.innerHTML = "No se recibió el token de autorización por parte de la API"; */
    }
  });

  var sendObject = JSON.stringify({username: user, password: password});

  console.log('vamos a enviar la petición:', sendObject);

  xhr.send(sendObject);
}
