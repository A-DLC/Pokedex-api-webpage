//Decidí dejar los datos en inglés ya que la gran mayoría de cosas en la api están en inglés
//Se ve mejor asi que dejarlo como "Tipo: Grass", en mi opinion.
document.body.style.zoom="90%";

function PK() {
  const queryString = window.location.search 
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString) 
  const code = urlParams.get('code');
  console.log(code);

//PETICION PRINCIPAL
  axios.get(`https://pokeapi.co/api/v2/pokemon/${code}`)
  .then(function (response4) {
    const data = response4.data;

  
  console.log(data);//data del pokemon actual


    //CONVIRTIENDO LA ALTURA A METROS Y A DECIMETROS
    let decimetro = data.height;
    let metros = Number(decimetro/10).toFixed(2);
    let pies = Number(decimetro/3.048).toFixed(2);

    //CONVIRTIENDO EL PESO A KILOGRAMOS Y LIBRAS
    let hectogramos = data.weight;
    let KILOGRAMOS = Number(hectogramos/10).toFixed(2);
    let LIBRAS = Number(hectogramos/4.536).toFixed(2);


//PINTAR IMAGENES
    document.getElementById('mas').src = data.sprites['front_default'],
    document.getElementById('mas2').src = data.sprites['back_default'],
    document.getElementById('mas3').src = data.sprites['front_shiny'],
    document.getElementById('mas4').src = data.sprites['back_shiny']

    if (data.sprites['front_female'] === null) {
      //Con ésto puedo determinar si el Pokemon tiene variaciones en el sprite femenino.
      //Sino existe el sprite front_female, entonces no hay sprites femeninos para el Pokémon actual.
      console.log("No tiene variacion femenina");
    }
    else 
      {//Pero si hay: los pinta en el HTML. Los coloco todos de una porque si existe 1, existen 4. (A menos que a la API le falte el dato.)
        //Para comprobar ésto, coloque en /info.html?code=592
        //El codigo 592 lo llevará a Frillish. Hay diferencias bastantes notorias entre macho y hembra
      console.log("Existen variaciones Femeninas");
      document.getElementById('fem').innerHTML = " Gender Variation";
          document.getElementById('fem1').src = data.sprites['front_female'],
          document.getElementById('fem2').src = data.sprites['back_female'],
          document.getElementById('fem3').src = data.sprites['front_shiny_female'],
          document.getElementById('fem4').src = data.sprites['back_shiny_female']

    }

    let names = data.name; //Para usar String y convertir la primera letra en mayúscula...
   _names = names.charAt(0).toUpperCase() + names.slice(1);


//INFORMACIÓN BÁSICA
    document.getElementById('name').innerHTML = `DEX NUMBER: ${data.id} | ${_names}`;
    document.getElementById('tipo').innerHTML =  data.types.map((type) => type.type.name).join('/').toUpperCase(), //Junta cada resultado como un String y los separa con "/" , también los transforma en mayuscula.
    document.getElementById('ab').innerHTML = data.abilities.map((ability) => ability.ability.name).join(', ').toUpperCase(),
    document.getElementById('alt').innerHTML = ` ${pies}ft     ||   ${metros}m`;
    document.getElementById('peso').innerHTML = ` ${KILOGRAMOS}Kg     ||   ${LIBRAS}lb`

    

//MOSTRAR ESTADISTICAS
  document.querySelector('#stats').innerHTML +=`
  <tr>
  <td>
  ${data.stats[0].base_stat}
  </td>
  <td>
 ${data.stats[1].base_stat}
  </td>   <td>
 ${data.stats[2].base_stat}
  </td>  <td>
 ${data.stats[3].base_stat}
  </td>  <td>
 ${data.stats[4].base_stat}
  </td>  <td>
 ${data.stats[5].base_stat}
  </td>
  </tr>`;
//En orden: HP, ataque, defensa, ataque especial, defensa especial y velocidad.



//MOSTRAR LOS MOVIMIENTOS DEL POKEMON
for (var q = 0; q < data.moves.length; q++) {
  axios.get(data.moves[q].move.url)
  .then(function(res){
    var movimiento = res.data;

      document.getElementById('cuadro').innerHTML +=`
      <tr>
      <td>
      ${movimiento.names[7].name}
      </td>
      
      <td>
      ${(movimiento.power === null) ? "-" : movimiento.power}
      </td>

      <td >
      ${(movimiento.accuracy === null) ? "-" : movimiento.accuracy}
      </td>

      <td>
      ${movimiento.pp}
      </td>

      <td>
      ${movimiento.type.name} 
      </td>

      <td>
    (${movimiento.damage_class.name})
      </td>

      </tr> `;
//movimiento.names[7].name contiene los nombres en inglés de los movimientos, español es [5], pero prefiero dejarlo todo en inglés.

  }).catch(function (error) {
    // handle error
    
    console.log(error);
  });



}

    console.log(response4.data.types.length);

    if (response4.data.types.length == 1) {//Si el Pokemon sólo tiene un Tipo:
      console.log("El pokemon tiene solamente 1 tipo")
    
    //DEBILIDADES DEL TIPO 1 
    axios.get(`${response4.data.types[0].type.url}`)
      .then(function(res){
        const dato = res.data.damage_relations.double_damage_from;
        console.log(dato);

      var outputd = "";
        for (var i = 0; i < dato.length; i++) {
          dato[i]
        outputd += `<li>${dato[i].name}</li>`
        }
         document.querySelector('#weak1').innerHTML = outputd;

      }).catch(function (error) {
    // handle error
    console.log(error);
  });


    }//CIERRA IF
    
    else{//Si tiene dos:
      console.log("El pokemon tiene 2 tipos")

    //DEBILIDADES DEL TIPO 1 
    axios.get(`${response4.data.types[0].type.url}`)
      .then(function(res){
        const dato = res.data.damage_relations.double_damage_from;
        console.log(dato);

        console.log(dato[0].name);
      var outputd = "";
        for (var i = 0; i < dato.length; i++) {
          dato[i]
        outputd += `<li>${dato[i].name}</li>`
        }
         document.querySelector('#weak1').innerHTML = outputd;

      }).catch(function (error) {
    // handle error
    console.log(error);
  });

   //DEBILIDADES DEL TIPO 2
   axios.get(`${response4.data.types[1].type.url}`)
    .then(function(res1){
    const dato1 = res1.data.damage_relations.double_damage_from;
    console.log(dato1);
    var outputd1 = "";
        for (var j = 0; j < dato1.length; j++) {
          console.log(dato1[j].name);
        outputd1 += `<li>${dato1[j].name}</li>`
        }
         document.querySelector('#weak2').innerHTML = outputd1;

    }).catch(function (error) {
    // handle error
    console.log(error);
  });


    }//CIERRRA ELSE



  })//parentesis del ".then(" de la primera consulta axios. 
    .catch(function (error) {
    // handle error
    
    console.log(error);
  });

}


//Obtener el boton de "back to top"
var mybutton = document.getElementById("myBtn");

//Cuando el usuario baja 20px desde el top(principio) de la pagina, muestra el botón
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

//Cuando se presiona el boton, vuelve al principio
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}










