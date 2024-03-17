//* OBTENER LA DATA DE JSON //*

const NODO_LISTA_PORTADA = "listaPortada";
const NODO_LISTA_COMENTARIOS = "listaComentarios";
const NODO_LISTA_SERVICIOS = "listaServicios";
const NODO_LISTA_TRABAJOS_REALIZADOS = "listaTrabajosRealizados";
const NODO_INFO_BEAUTY_STUDIO_FV = "infoAdicionalBeautyFabiolaVazquez";

const TIPO_TRABAJO_PESTAÑAS = 1;
const TIPO_TRABAJO_CEJAS = 2;

async function obtenerValorDeNodo(nodoEspecifico) {
  try {
    const respuesta = await fetch("./resources/data/data.json");
    const data = await respuesta.json();
    return data[nodoEspecifico];
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    return null;
  }
}

// Uso del método
async function getDataJson(nodo) {
  try {
    const valor = await obtenerValorDeNodo(nodo);
    return valor;
  } catch (error) {
    console.error("Error al obtener el valor del nodo:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const indicators = document.querySelector(".carousel-indicators");
  let timer = null;
  let images = null; // Variable para almacenar las imágenes del carrusel

  // Obtener el contenedor del carrusel
  const carouselImagesContainer = document.querySelector(".carousel-images");

  // Generar los indicadores
  const generateIndicators = (numIndicators) => {
    for (let i = 0; i < numIndicators; i++) {
      const indicator = document.createElement("div");
      indicator.className = "carousel-indicator";
      indicator.addEventListener("click", () => {
        clearInterval(timer); // Detener el temporizador al hacer clic en un indicador
        timer = setInterval(nextImage, 6000); // Reiniciar el temporizador
        changeImage(i);
      });
      indicators.appendChild(indicator);
    }
  };

  // Obtener la data del JSON y generar los elementos del carrusel
  getDataJson(NODO_LISTA_PORTADA)
    .then((listaPortada) => {
      // Generar los elementos del carrusel
      listaPortada.forEach((imagen, index) => {
        const divImage = document.createElement("div");
        divImage.classList.add("carousel-image", `ci${index + 1}`);
        const anchoVentana = window.innerWidth;
        if (anchoVentana <= 450) {
          divImage.style.backgroundImage = `url('./resources/images/${imagen.imagenMovil}')`;
      } else {
          divImage.style.backgroundImage = `url('./resources/images/${imagen.imagen}')`;
      }


        

        const divTopPresentation = document.createElement("div");
        divTopPresentation.classList.add("div-top-presentation");

        const logo = document.createElement("img");
        if (anchoVentana <= 450) {
          logo.src = "./resources/svg/logotipowhitee.svg";
      } else {
        logo.src = "./resources/svg/logotipo.svg";
      }
        logo.draggable = false;
        logo.width = "240";
        logo.alt = "LOGOTIPO";

        const titulo = document.createElement("h1");
        titulo.textContent = imagen.servicio;

        const subtitulo = document.createElement("p");
        subtitulo.textContent = imagen.axiliarServicio;

        divTopPresentation.appendChild(logo);
        divTopPresentation.appendChild(titulo);
        divTopPresentation.appendChild(subtitulo);

        const divBottomImage = document.createElement("div");
        divBottomImage.classList.add("div-bottom-image");

        const texto = document.createElement("p");
        texto.innerHTML = imagen.descripcion;

        divBottomImage.appendChild(texto);

        divImage.appendChild(divTopPresentation);
        divImage.appendChild(divBottomImage);

        carouselImagesContainer.appendChild(divImage);
      });

      // Actualizar las imágenes después de generar los elementos del carrusel
      images = document.querySelectorAll(".carousel-image");

      // Generar los indicadores después de generar los elementos del carrusel
      generateIndicators(images.length);

      // Agregar la clase 'active' al primer indicador
      indicators.children[0].classList.add("active");
    })
    .catch((error) => {
      console.error("Error al obtener la lista de imágenes:", error);
    });

  let currentIndex = 0;

  function changeImage(index) {
    const offset = index * -100; // Calcula el desplazamiento necesario
    carouselImagesContainer.style.transform = `translateX(${offset}%)`; // Aplica el desplazamiento

    // Actualiza los indicadores
    const indicatorsChildren = indicators.children;
    if (indicatorsChildren[currentIndex]) {
      indicatorsChildren[currentIndex].classList.remove("active");
    }
    indicatorsChildren[index].classList.add("active");

    currentIndex = index; // Actualiza el índice actual
  }

  function nextImage() {
    if (!images) return; // Verificar si images es null o no está definido
    let nextIndex = (currentIndex + 1) % images.length;
    changeImage(nextIndex);
  }

  timer = setInterval(nextImage, 6000); // Iniciar el temporizador

  // Obtener la data del JSON y generar los comentarios
  getDataJson(NODO_LISTA_COMENTARIOS)
    .then((listaComentarios) => {
      // Generar los elementos del carrusel
      let contenedorComentarios = document.querySelector(".feedback-container");
      listaComentarios.forEach((comentario, index) => {
        let newComentario = "";
        newComentario += `<div class="feedback">
          <div class="qualification">`;

        for (let i = 0; i < 5; i++) {
          newComentario += `<img
            src="./resources/svg/star.svg"
            width="50px"
            height="50px"
            draggable="false"
            alt="star"
          />`;
        }

        newComentario += `</div>
          <div class="div-info-feedback dvifd">
            <img
              src="./resources/images/fotos/${comentario.imagenTrabajoRealizado}"
              alt="IMAGEN"
              draggable="false"
            />
            <p>
              <b>${comentario.nombreCliente}</b> ${comentario.comentario}
            </p>
          </div>
        </div>`;

        contenedorComentarios.innerHTML += newComentario;
      });
    })
    .catch((error) => {
      console.error("Error al obtener la lista de comentarios:", error);
    });

    let numeroWhatsappp = "";

       // Obtener la data del JSON y generar los MEDIOS DE COMUNICACIÓN DE INFORMACION ADICIONAL
  getDataJson(NODO_INFO_BEAUTY_STUDIO_FV)
  .then((listaInfoAdicional) => {
    // Generar los elementos del carrusel
    let contenedorInfoAdicional = document.querySelector(".column-info-social");

    let elementoWhats = listaInfoAdicional.find(what => what.nombre === "WHATSAPP");

    numeroWhatsappp = elementoWhats.descripcion;

    listaInfoAdicional.forEach((info, index) => {
      let infoa = "";
      infoa += `<div class="seec">
      <img
        src="./resources/svg/${info.imagen}"
        width="50px"
        height="50px"
        alt="${info.nombre}"
      />
      <p class="subtitleinfo-add">${info.nombre}</p>
      <p><a target="_blank" href="${info.valor}">${info.descripcion}</a></p>
    </div>`;

      contenedorInfoAdicional.innerHTML += infoa;
      
    });
  })
  .catch((error) => {
    console.error("Error al obtener la lista de comentarios:", error);
  });

  // Obtener la data del JSON y generar los tipos de servicios que se ofrecen
  getDataJson(NODO_LISTA_SERVICIOS)
    .then((listaServicios) => {
      // Generar los elementos del carrusel
      let contenedorServicios = document.querySelector(".divs-services");
      listaServicios.forEach((servicio, index) => {
        let newServicio = "";

        newServicio += `<div class="div-service">
           <div class="general-info-service">
             <h3>${servicio.nombreServicio}</h3>
             <div class="div-columns-service">
               <ul>`;

        for (let derivado of servicio.listaDerivados) {
          newServicio += `<li>${derivado}</li>`;
        }

        newServicio += `</ul>
               <img
                 width="150px"
                 draggable="false"
                 height="150px"
                 src="./resources/images/${servicio.imagenServicio}"
                 alt="IMAGEN"
               />
             </div>
             <div onclick="navigatedToURL('https://api.whatsapp.com/send?phone=${numeroWhatsappp}&text=¡Hola! Me gustaría hacer una reservación para ${servicio.nombreServicio}', null)" class="button-make-reservation">
               <p>Solicitar reservación</p>
               <img
                 width="30px"
                 draggable="false"
                 height="30px"
                 src="./resources/svg/iconWhats.svg"
                 alt=""
               />
             </div>
           </div>
         </div>`;

        contenedorServicios.innerHTML += newServicio;
      });
    })
    .catch((error) => {
      console.error("Error al obtener la lista de comentarios:", error);
    });



     // Obtener la data del JSON y generar los TRABAJOS REALIZADOS DE CEJAS y PESTAÑAS
  getDataJson(NODO_LISTA_TRABAJOS_REALIZADOS)
  .then((listaTrabajosRealizados) => {
    // Generar los elementos del carrusel
    let contenedorPestanias = document.querySelector(".fmcmakes");
    let contenedorCejas = document.querySelector('.fbackcejas');

    const trabajosPestañas = listaTrabajosRealizados.filter(t => { return t.tipoTrabajo == TIPO_TRABAJO_PESTAÑAS});
    const trabajosCejas = listaTrabajosRealizados.filter(t => { return t.tipoTrabajo == TIPO_TRABAJO_CEJAS});

    trabajosPestañas.forEach((tr) => {
      tr.lista.forEach((trabajo, index) => {
        let trabajorp = "";
  
        trabajorp += `<div class="feedback makess">
        <div class="qualification type-make">
          <p>${trabajo.nombreTecnicaRealizada}</p>
        </div>
        <div class="div-info-feedback img-make">
          <img
            src="./resources/images/fotos/${trabajo.imagen}"
            alt="IMAGEN"
            draggable="false"
          />
        </div>
      </div>`;
  
        contenedorPestanias.innerHTML += trabajorp;
      }
    );
    });

    trabajosCejas.forEach((trr) => {
      trr.lista.forEach((trabajo, index) => {
        let trabajorc = "";
  
        trabajorc += `<div class="feedback makess">
        <div class="qualification type-make">
          <p>${trabajo.nombreTecnicaRealizada}</p>
        </div>
        <div class="div-info-feedback img-make">
          <img
            src="./resources/images/fotos/${trabajo.imagen}"
            alt="IMAGEN"
            draggable="false"
          />
        </div>
      </div>`;
        
        contenedorCejas.innerHTML += trabajorc;
      }
    );
    });



 
   
  })
  .catch((error) => {
    console.error("Error al obtener la lista de trabajos realizados:", error);
  });



  
});
async function navigatedToURL(url, type) {
  if (type != null) {
      try {
          const listaInfoAdicional = await getDataJson(NODO_INFO_BEAUTY_STUDIO_FV);
          const filteredInfo = listaInfoAdicional.filter(info => info.nombre === type);
          if (filteredInfo.length > 0) {
              const valor = filteredInfo[0].valor; // Obtener el valor deseado
              window.open(valor); // Reemplaza 'parametro' por el nombre del campo que necesites
          }
      } catch (error) {
          console.error('Error al obtener la información adicional:', error);
      }
  }
  window.open(url);
}


document.getElementById('menudrop').addEventListener('change', function() {
  let icondrow = document.querySelector('.icondrow');

  icondrow.classList.toggle('icondrowa');
});

function hiddenMenu(){
  document.querySelector('#menudrop').checked = false;
  let icondrow = document.querySelector('.icondrow');
  icondrow.classList.toggle('icondrowa');
}

window.addEventListener("load", () => {
  // Ocultar el div con la clase 'div-mask'
  const divMask = document.querySelector('.div-mask');
  if (divMask) {
    divMask.classList.add('hidden');
  }

  // Aquí puedes colocar el resto de tu código, como la carga de imágenes, texto, etc.
});