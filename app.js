let visor = document.querySelector(".container__visor");
let centerBtn = document.querySelector(".container__center");
let infor = document.querySelector(".container__name");
let poketmon = document.querySelector(".container__contenedor");
let ability = document.querySelector(".container__infoge--hability")
let txt = document.querySelector(".container__type")
let fisicas = document.querySelector(".container__infoge--fisicas")
let currentData = 1
let search = document.querySelector(".container__search")


let informacionPokemos = {
  name: undefined,
  base_experience: undefined,
  weight: undefined,
  1: undefined,
  2: undefined,
  hp: undefined,
  attack: undefined,
  defense: undefined,
  "special-attack": undefined,
  "special-defense": undefined,
  speed: undefined,
  front_default: undefined,
};

// manipulacion del DOM

let insertData = () => {
  visor.innerHTML = `  <img class="container__imgpo" src="${informacionPokemos["front_default"]}" alt="">`;
 infor.innerHTML = ` <p>${informacionPokemos.name}</p>`
  poketmon.innerHTML = ` <div class="container__contorno">
                   <p class="container__type">${informacionPokemos[1]}</p>
                  </div>
                  <div class="container__contorno">
                  <p class="container__type">${informacionPokemos[2]}</p>
                  </div>`

ability.innerHTML = ` <p class="container__item">hp: ${informacionPokemos["hp"]}</p>
                      <p class="container__item">especial-attack:${informacionPokemos["special-attack"]}</p>
                      <p class="container__item">attack: ${informacionPokemos["attack"]}</p>
                      <p class="container__item">especial-defense: ${informacionPokemos["special-defense"]}</p>
                      <p class="container__item">defense:${informacionPokemos["defense"]}</p>
                      <p class="container__item">speed: ${informacionPokemos["speed"]}</p>
 `

fisicas.innerHTML = ` <div class="container__cosasfi">
                      <p class="container__txt">Weight: ${informacionPokemos["weight"]}</p>
                      </div>
                      <div class="container__cosasfi">
                      <p class="container__txt">Exp: ${informacionPokemos["base_experience"]}</p>
                      </div>`  
  search.value = ""
};

let processData = (datos) => {
  for (const clave of datos.stats) {
    let propiedad = clave.stat.name;
    if (informacionPokemos.hasOwnProperty(propiedad)) {
      informacionPokemos[propiedad] = clave["base_stat"];
    }
  }

  for (const clave of datos.types) {
    let propiedad = clave.slot;
    if (informacionPokemos.hasOwnProperty(propiedad)) {
      informacionPokemos[propiedad] = clave.type.name;
    }
  }

  for (const clave in datos) {
    for (const valor in informacionPokemos) {
      if (clave === valor) {
        informacionPokemos[valor] = datos[clave];
      }
      if (clave === "sprites") {
        for (const item in datos[clave]) {
          if (item === valor) {
            informacionPokemos[valor] = datos[clave][item];
          }
        }
      }
    }
  }

  insertData();
  
};




let requestData = (n) => {
 
    fetch(`https://pokeapi.co/api/v2/pokemon/${n}`)
      .then((response) => {

      if(!response.ok){
        throw new Error (response.status)
        
      }
      return response.json()
      })
      .then((data)=>{
        processData(data)
      })
      .catch((error)=>{
      
        alert(`falla al encontrar el recurso ${error}`)
        
      })
      
  
};


search.addEventListener("keypress",(e)=>{
  if(e.key === "Enter"){
   requestData(search.value.toLowerCase())
}
  }

)

  requestData(1)
