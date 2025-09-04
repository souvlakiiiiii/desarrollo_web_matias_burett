const ahora = new Date();
ahora.setHours(ahora.getHours() + 3);

const año = ahora.getFullYear();
const mes = String(ahora.getMonth() + 1).padStart(2, '0');
const dia = String(ahora.getDate()).padStart(2, '0');
const horas = String(ahora.getHours()).padStart(2, '0');
const minutos = String(ahora.getMinutes()).padStart(2, '0');

const fechaFormateada = `${año}-${mes}-${dia}T${horas}:${minutos}`;

const inputFechaHora = document.getElementById("fecha");
if (inputFechaHora) {
    inputFechaHora.value = fechaFormateada;
    inputFechaHora.min = fechaFormateada;
}
