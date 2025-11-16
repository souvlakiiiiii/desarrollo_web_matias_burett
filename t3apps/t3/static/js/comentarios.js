const enviarComentario = async (event) => {
    event.preventDefault();

    const formComentarios = document.getElementById("form-comentarios");
    const listaComentarios = document.getElementById("lista-comentarios");

    const avisoId = formComentarios.dataset.avisoId; 
    const nombre = document.getElementById("nombre-com").value.trim();
    const texto = document.getElementById("agregar-com").value.trim();

    const datos = new FormData();
    datos.append("nombre-com", nombre);
    datos.append("agregar-com", texto);

    try {
        const respuesta = await fetch(`/comentarios/agregar/${avisoId}`, {
            method: "POST",
            body: datos
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            const errorMessage = data.error || 'Error desconocido al enviar el comentario.';
            alert(errorMessage);
            console.error('Error de validación del servidor:', data);
            return;
        }

        const nuevoComentario = data;

        const mensajeVacio = listaComentarios.querySelector('p');
        if (mensajeVacio && mensajeVacio.textContent === 'No hay comentarios aún.') {
            listaComentarios.removeChild(mensajeVacio);
        }
      
        const div = document.createElement("div");
        div.classList.add("comentario");
        
        const fechaFormateada = new Date(nuevoComentario.fecha).toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        div.innerHTML = `
            <strong>${nuevoComentario.nombre}</strong> (${fechaFormateada})
            <p>${nuevoComentario.texto}</p>
        `;
        
        listaComentarios.append(div);
        formComentarios.reset();

    } catch (error) {
        console.error("Fallo de red o error de procesamiento:", error);
        alert("No se pudo enviar el comentario debido a un fallo de conexión.");
    }
};

const inicializarComentarios = () => {
    const formComentarios = document.getElementById("form-comentarios");
    if (formComentarios) {
        formComentarios.addEventListener("submit", enviarComentario);
    }
};

document.addEventListener("DOMContentLoaded", inicializarComentarios);