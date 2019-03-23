// basado en el jwt-vanilla.js de JonathanMH :
// à la https://jonathanmh.com/example-json-web-tokens-vanilla-javascript/
// vamos a  guardar el token recibido de la APItrello en nuestro navegador localStorage

// make the request to the login endpoint
function getToken() {
  var loginUrl = "http://apitrello.herokuapp.com/users/login";
  var xhr = new XMLHttpRequest();
  var userElement = document.getElementById('username');
  var passwordElement = document.getElementById('password');
  var tokenElement = document.getElementById('token');
  var user = userElement.value;
  var password = passwordElement.value;

  xhr.open('POST', loginUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.addEventListener('load', function() {
      var responseObject = JSON.parse(JSON.stringify(this.response));
      /*    console.log(responseObject); */
      console.log('almacenamos el JWtoken recibido en la variable localStorage "token". Ojo, se acumulan sucesivamente en un Array de tokens recibidos ');
      console.log(responseObject);
      localStorage.setItem('token', responseObject);
      /* para recuperarlo a posteriori, localStorage.setItem('userId'); */
    if (responseObject) {
        tokenElement.innerHTML = responseObject;
        console.log('Logueado: vamos al tablón de tareas !');
        alert('Logueado: vamos al tablón de tareas !');
	location = 'tablon.html';
    } else {
          tokenElement.innerHTML = "No se recibió el token de autorización por parte de la API";
    }
  });

  var sendObject = JSON.stringify({username: user, password: password});

  console.log('vamos a enviar la petición:', sendObject);

  xhr.send(sendObject);
}
