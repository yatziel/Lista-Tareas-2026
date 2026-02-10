/* Referencias al documento del DOM */

const tareaEntrada        = document.getElementById("tareaEntrada");
const botonAgregar        = document.getElementById("botonAgregar");
const contenedorTareas    = document.getElementById("contenedorTareas");
const mensaje             = document.getElementById("mensaje");
const contadorTotales     = document.getElementById("contadorTotales");
const contadorTerminadas  = document.getElementById("contadorTerminadas");
const botonOcultar        = document.getElementById("botonOcultar");
const botonEliminar       = document.getElementById("botonEliminar");


/* Función Crear Tarea (Nodo Tarea) */

function crearElementoTarea() {
  /* Creamos los elementos de la tarea */
  const tareaContendor = document.createElement("div");
  const tareaTexto = document.createElement("p");
  const tareaIconos = document.createElement("div");
  const iconoCompletada = document.createElement("i");
  const iconoEliminar = document.createElement("i");
  
  /* Agregamos las clases a los elementos */
  tareaContendor.classList.add("tarea");
  tareaTexto.classList.add("tarea-texto");
  tareaIconos.classList.add("tarea-iconos");
  iconoCompletada.classList.add("bi", "bi-check-circle");
  iconoEliminar.classList.add("bi", "bi-trash2");

  /* Creamos la estructura de la tarea */
  tareaIconos.append(iconoCompletada, iconoEliminar);
  tareaContendor.append(tareaTexto, tareaIconos);

  /* Agregamos el texto del usuario */
  tareaTexto.innerText = tareaEntrada.value;

  /* Escuchadores de los iconos */
  
  // Ìcono Completada
  iconoCompletada.addEventListener("click", (e) => {
    const tareaElemento = e.target.parentNode.parentNode;
    const esCompletada = tareaElemento.classList.contains('tarea-completada');
    tareaElemento.classList.toggle('tarea-completada');

    if(esCompletada) {
      e.target.classList.remove('bi-dash-circle');
      e.target.classList.add('bi-check-circle');
      // 👇 Si estaban ocultas, mostramos esta tarea que ya no está completada
      if (tareasOcultas) {
        tareaElemento.style.display = "flex";
      }
    }else {
      e.target.classList.remove('bi-check-circle');
      e.target.classList.add('bi-dash-circle');
      // 👇 Si estaban ocultas, ocultamos esta tarea recién completada
      if (tareasOcultas) {
        tareaElemento.style.display = "none";
      }
    }
    /* Actualizamos los contadores */
    actualizarContadores();
    /* Actualizamos los botones */
    actualizarEstadoBotones();
  })

  // Ìcono Borrar
  iconoEliminar.addEventListener("click", (e) => {
    const tareaElemento = e.target.parentNode.parentNode;
    tareaElemento.remove();
    /* Actualizamos los contadores */
    actualizarContadores();
    /* Actualizamos los botones */
    actualizarEstadoBotones();
  })

  /* Retornamos la estructura */
  return tareaContendor;
}

/* Función Agregar Tarea */

function agregarTarea() {
  /* Quitamos espacios al inicio y al final del valor de entrada */
  const texto = tareaEntrada.value.trim();

  if (texto) {
    /* Agregamos la tarea al contenedor de tareas */
    const elementoTarea = crearElementoTarea();
    contenedorTareas.append(elementoTarea);

    /* Reiniciamos el value de tareaEntrada */
    tareaEntrada.value = "";

    /* Mostramos el mensaje de tarea creada */
    mensaje.textContent = "Tarea creada exitosamente! 🫡";

    /* Actualizamos los contadores */
    actualizarContadores();
    /* Actualizamos los botones */
    actualizarEstadoBotones();

  } else {
    /* Mostramos el mensaje de escribir antes de agregar*/
    mensaje.textContent = "Por favor escribe una tarea antes de agregar. 😅";
  }
}


/* Función Actualizar Contadores */

function actualizarContadores() {
  // Contamos todas las tareas
  const tareasTotales = document.querySelectorAll(".tarea");
  const tareasCompletadas = document.querySelectorAll(".tarea-completada");

  // Actualizamos los contadores en el DOM
  contadorTotales.textContent = tareasTotales.length;
  contadorTerminadas.textContent = tareasCompletadas.length; 
}

/* Función Ocultar/Mostrar Tareas Completadas */

let tareasOcultas = false; // Variable para controlar el estado

function toggleOcultarCompletadas() {
  const tareasCompletadas = document.querySelectorAll(".tarea-completada");

  tareasCompletadas.forEach( (tarea) => {
    if(tareasOcultas) {
      // Mostramos tareas
      tarea.style.display = "flex";
    }else {
      // Ocultamos tareas
      tarea.style.display = "none";
    }
  } );

  // Cambiamos el estado
  tareasOcultas = !tareasOcultas;

  // Cambiamos el texto del botón

  if (tareasOcultas) {
    botonOcultar.textContent = "Mostrar Completadas";
    mensaje.textContent = "Tareas completadas ocultadas 👀";
  } else {
    botonOcultar.textContent = "Ocultar Completadas";
    mensaje.textContent = "Tareas completadas visibles 👁️";
  }
}

/* Función Eliminar Todas las Tareas Completadas */


function eliminarCompletadas() {
  const tareasCompletadas = document.querySelectorAll(".tarea-completada");

  if (tareasCompletadas.length === 0) {
    mensaje.textContent = "No hay tareas completadas para eliminar 🤷";
    return;
  }
  
  // Eliminamos cada tarea completada
  tareasCompletadas.forEach(tarea => {
    tarea.remove();
  });
  
  // Actualizamos contadores
  actualizarContadores();
  /* Actualizamos los botones */
  actualizarEstadoBotones();
  
  // Reseteamos el estado de ocultar si estaba activo
  if (tareasOcultas) {
    tareasOcultas = false;
    botonOcultar.textContent = "Ocultar Completadas";
  }
  
  // Mostramos mensaje
  mensaje.textContent = `${tareasCompletadas.length} tarea(s) eliminada(s) exitosamente! 🗑️`;
}




/* Función Actualizar Estado de Botones */

function actualizarEstadoBotones() {
  const tareasTotales = document.querySelectorAll(".tarea");
  const tareasCompletadas = document.querySelectorAll(".tarea-completada");
  
  // Deshabilitar botón "Ocultar" si no hay tareas completadas
  if (tareasCompletadas.length === 0) {
    botonOcultar.disabled = true;
    botonOcultar.style.opacity = "0.5";
    botonOcultar.style.cursor = "not-allowed";
  } else {
    botonOcultar.disabled = false;
    botonOcultar.style.opacity = "1";
    botonOcultar.style.cursor = "pointer";
  }
  
  // Deshabilitar botón "Eliminar" si no hay tareas completadas
  if (tareasCompletadas.length === 0) {
    botonEliminar.disabled = true;
    botonEliminar.style.opacity = "0.5";
    botonEliminar.style.cursor = "not-allowed";
  } else {
    botonEliminar.disabled = false;
    botonEliminar.style.opacity = "1";
    botonEliminar.style.cursor = "pointer";
  }
}

/* Escuchadores */

botonAgregar.addEventListener("click", agregarTarea);
botonOcultar.addEventListener("click", toggleOcultarCompletadas);
botonEliminar.addEventListener("click", eliminarCompletadas);



/* Hacemos que el al presionar la tecla Enter en el input se cree la entrada */

tareaEntrada.addEventListener("keydown", (e) => {
  if(e.key == "Enter") {
    agregarTarea();
  }
})

/* Mostrar el mensaje al escribir */

tareaEntrada.addEventListener("input", () => {

  if(tareaEntrada.value.trim() === ""){
    mensaje.textContent = "Escribe tu próxima tarea! 🤗"
  }else{
     mensaje.textContent = "Esto se va poner bueno... 😉"
  }
  
})


/* Al inicializar la página */
actualizarEstadoBotones();