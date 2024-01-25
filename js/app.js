// variables


const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []



// event listeners

eventListeners()
function eventListeners() {
    // cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit',agregarTweet);

    // cuando el documento esta listo

    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML()
    })
}



// funciones

function agregarTweet(e) {
    e.preventDefault();

    // textarea don el usuario escribe

    const tweet = document.querySelector('#tweet').value

    // validacion

    if (tweet === '') {
        mostrarError('un mensaje no puede ir vacio')
        return; // evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // AÑADIR AL ARREGLO DE TWEETS

    tweets = [...tweets, tweetObj]

    // una vez agregado 
    crearHTML()

    // reiniciar el formulario

    formulario.reset()

}


// mostrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');


    // insertarlo en el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError)
    
    // elimina la alerta despues de 3 segundos
    setTimeout(() =>{
        mensajeError.remove()
    }, 3000)
}


// muestra un listado de los tweets

function crearHTML() {

    limpiarHTML()
    if (tweets.length > 0) {
        tweets.forEach(tweet =>{

         //  agregar un boton de eliminar

         const btnEliminar = document.createElement('a')
         btnEliminar.classList.add('borrar-tweet');
         btnEliminar.innerText = 'X'

         // añadir la funcion de eliminar

         btnEliminar.onclick = () =>{
            borrarTweet(tweet.id)
         }

            // crear el html
            const li = document.createElement('li');

            // añadir el texto 
            li.innerText = tweet.tweet;

            // asignar el boton
            li.appendChild(btnEliminar)

            // insertarlo en el html

            listaTweets.appendChild(li)
        })
    }

    sincronizarStorage()
}


// agregar los tweets actuales a localstorage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}



// limpiar el html

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}