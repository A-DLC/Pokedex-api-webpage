document.body.style.zoom="75%";
var limite = 25;

function limitelista(){//Al precionar el botón la función aumenta el limite de peticiones.
parseInt(limite += 25);
console.log(limite);
listaPokemon();

}

const listaPokemon = () => {/*Función principal para obtener la lista de la pokedex. Usando Promesas, fetch y Promise.all.
(Nota: Originalmente estuve usando el axios.get para ésto, pero los resultados de los pokemon me los enviaba en desorden al index luego de cumplir la función, investigué ésta manera de hacerlo con promesas y fetch para solucionar ése problema que me daba con axios. Dicho problema no lo tuve en la pagina de información.)*/

  const promesas = []; //Array donde se guardarán las promesas.
  
/*limite de la lista de pokedex, ejecuta la funcion de guardar las promesas en un json() tantas veces 
sea el limite de la lista. Empieza en 1 porque no hay pokemon con id 0. El fetch se usa para acceder a recursos del servidor de manera asíncrona

*/
    for (let i = 1; i <= limite; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
       promesas.push(fetch(url).then((res) => res.json()));
  }

  /*Promise.all devuelve una promesa que termina correctamente cuando todas las promesas dentro del argumento iterable han sido concluídas 
  con éxito, ésta hace que cada peticion asincrona del fetch corra en paralelo(todas a la vez) 
  en vez de secuencial (Una a una). Gracias a ésto las llamadas a la API consigue todos los resultados de una.
  */ 
  Promise.all(promesas)
  .then((results) => {


   /* La funcion map() en la const pokemon va a iterar por los resultados de las promesas y crear una
    referencia llamada "data" que contendrá los datos de todos los pokemon que se mostrarán en el index*/ 
   const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites['front_default'],
    }))

    console.log(pokemon);

    const pkoutput = pokemon.map(//Mismo uso de antes, solo que para imprimir los resultados iterados dentro de HTML. 
      (data) => `
      <li class ="card">
        <img class="card-image" src="${data.image}" alt="Can´t get image..."/>
        <span><h2 class="card-title"> #${data.id}.${data.name}</h2></span>
        <a  style="color: #4DE920;" href="./info.html?code=${data.id}" target="_blank" >Information</a>
      </li>
      `).join(' '); 
   //El join() "junta" las cartas como si fuera un String dejando un espacio. No se reflejará en el index por el css, pero sin el css se vería un espacio entre cartas de pokemon.

   document.getElementById('pokedex').innerHTML = pkoutput;

  })

};







