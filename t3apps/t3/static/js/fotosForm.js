const primeraFoto = document.getElementById('foto1');
const btnAgregar = document.getElementById('agregar-foto');
const contenedor = document.getElementById('contenedor-fotos');

primeraFoto.addEventListener('change', () => {
    if (primeraFoto.files.length > 0) {
        btnAgregar.style.display = 'inline-block';
    }
});

let contador = 2; // empieza desde 2 porque ya existe foto1

btnAgregar.addEventListener('click', () => {
    if (contador <= 5) {
        const nuevoInput = document.createElement('input');
        nuevoInput.type = 'file';
        nuevoInput.id = 'foto' + contador;
        nuevoInput.name = 'foto' + contador;
        contenedor.appendChild(nuevoInput);
        contenedor.appendChild(document.createElement('br'));
        contador++;
    } else {
        const nuevoTexto = document.createElement("p");
        nuevoTexto.id = "texto";
        nuevoTexto.textContent = "Has alcanzado el límite de fotos.";
        contenedor.appendChild(nuevoTexto);
        btnAgregar.disabled = true; // opcional: deshabilitar el botón
    }
});
