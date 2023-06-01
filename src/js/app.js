//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Events
eventListeners();
function eventListeners() {
  formulario.addEventListener("submit", agregarTweet);

  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];//si no se encuentra valor se le asigna un array ([]) para que no de error

    crearHTML();
  });
  
}

//Functions
function agregarTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("#tweet").value;

  if (tweet === '') {
    mostrarAlerta('No puedes publicar un tweet vacío');
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweetContenido: tweet,
  };

  tweets = [...tweets, tweetObj];

  crearHTML();

  formulario.reset();
}

//Función para crear el HTML en el cual se mostrará el contenido del tweet
function crearHTML() {

    //por cada vez que publique un tweet se van a eliminar todos del html agregandose nuevamente todos desde el arreglo tweets
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            const estructuraTweet = `
            <div class="flex space-x-4 border-b border-zinc-800 px-5 py-3">
                <img src="src/img/foto_perfil.jpg" alt="Foto pefil de twitter" class="w-14 h-14 rounded-full">
                <div class="w-full">
                    <div class="flex justify-between items-center">
                        <p class="font-bold">Owen 👽 <span class="font-normal text-gray-500">@owenvass</span>
                        </p>
                        <button id="btn-eliminar" onclick="eliminarTweet(${tweet.id})"><i class="fa-regular fa-trash-can text-twitter text-sm"></i></button>
                    </div>
                    <p>${tweet.tweetContenido}</p>
                </div>
            </div>
            `;
            listaTweets.insertAdjacentHTML("beforeend", estructuraTweet);
        });
    }
    
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

//por cada vez que publique un tweet se van a eliminar todos del html agregandose nuevamente todos desde el arreglo tweets
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function mostrarAlerta(mensaje) {
  const alerta = document.createElement("p");
  alerta.textContent = mensaje;
  alerta.classList.add('bg-red-500', 'p-1.5', 'mt-2', 'rounded-sm', 'text-center', 'text-white', 'text-sm', 'font-bold');
  formulario.appendChild(alerta);
  setTimeout(() => {
    alerta.remove();
  }, 2000);
}

function eliminarTweet(tweetId){
    tweets = tweets.filter(tweet => tweet.id !== tweetId);
    crearHTML();
}