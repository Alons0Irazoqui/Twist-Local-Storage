//Variables
const formulario = document.querySelector("#formulario");
const contenedorTweets = document.querySelector("#lista-tweets");
let tweets = [];

console.log(formulario);
console.log(contenedorTweets);

//Events.listener
document.addEventListener("DOMContentLoaded", () => {
    //Obteniendo los valores desde local storage
    tweets = JSON.parse(localStorage.getItem("tweet")) || []; // Si no hay nada en el local storage, retorna un array vacio

    //Mosttando de nuevo los tweets al cargar la pagina
    mostarHTML();

    formulario.addEventListener("submit", mostrarTweet);
})


//Funciones
function mostrarTweet(e){
    e.preventDefault();

    const valueTweet = formulario.querySelector("textarea").value.trim();

    console.log(valueTweet);

    if(valueTweet.trim() === ""){
        mostrarError("Un mensaje no puede ir vacio");
        return;
    }

    //Creando el objeto Tweet con un identificador
    const tweetOjb = {
        id: Date.now(), // Te retorna un numero unico
        texto: valueTweet,
    }

    //Validar si el tweet ya existe
    if (tweets.some(tweet => tweet.texto === valueTweet)) { // Some verifica si almenos un elemento del array cumple una condicion
        mostrarError("Este tweet ya existe");
        return;
    }

    //Añadir al array de tweets
    tweets = [...tweets, tweetOjb];
    
    //Mostrando los tweets en el html
    mostarHTML();

    //Reseteando el formulario
    formulario.reset();
    

}

//Funcion para mostrar el html
function mostarHTML(){
    //Agregando los valores a local storage
    agregarLocalStorage();

    //Limpiar el html
    limpiarHTML();

    //Moatrando los tweets en el html
    for (const valor of tweets) {
        //Agregar boton de eliminar
        const btnEliminar = document.createElement("A");
        btnEliminar.classList.add("borrar-tweet");
        btnEliminar.textContent = "X";

        //Añadir la funcion de eliminar
        btnEliminar.onclick = () => {
            borrarTweet(valor.id);
        }

        const li = document.createElement("LI");
        li.textContent = valor.texto;

        //Añadir el boton de eliminar
        li.appendChild(btnEliminar);
        contenedorTweets.appendChild(li);
    }

}

//Funcion para borrar un tweet
function borrarTweet(id){
    tweets = tweets.filter( valor => valor.id !== id);
    console.log(tweets);
    
    mostarHTML();
}

//Limpiar HTML
function limpiarHTML(){
    while(contenedorTweets.firstChild){
        contenedorTweets.removeChild(contenedorTweets.firstChild);
    }
}

//Mostrar mensaje de error
function mostrarError(mensaje){
    //Limpiar la alerta
    limpiarAlerta();

    //Creando la alerta
    const error = document.createElement("p");
    error.textContent = mensaje;
    error.classList.add("error");

    //Insertarlo en el contenido
    const contenedorContenido = document.querySelector("#contenido");
    contenedorContenido.appendChild(error);

    setTimeout(() => {
        error.remove();
    },1500)

}

//Function para limpiar la alerta de error
function limpiarAlerta(){
    const container = document.querySelector("#contenido");

    if(container.children[1]){
        container.children[1].remove();
        return;
    }
}


//Funcion para agregar a local storage
function agregarLocalStorage(){
    localStorage.setItem("tweet", JSON.stringify(tweets));
}
