/* Referencias al documento del DOM */

const tareaEntrada = document.getElementById("tareaEntrada");
const botonAgregar = document.getElementById("botonAgregar");
const contenedorTareas = document.getElementById("contenedorTareas");
const mensaje = document.getElementById("mensaje");

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

  /* Retornamos la estructura */
  return tareaContendor;
}

/* Escuchadores */

botonAgregar.addEventListener("click", agregarTarea);

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
  } else {
    /* Mostramos el mensaje de escribir antes de agregar*/
    mensaje.textContent = "Por favor escribe una tarea antes de agregar. 😅";
  }
}