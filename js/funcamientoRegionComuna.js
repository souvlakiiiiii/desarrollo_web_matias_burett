const seleccionarRegion = document.getElementById("region");
const seleccionarComuna = document.getElementById("comuna");

region_comuna.regiones.forEach(region => {
    const opcion = document.createElement("option");
    opcion.value = region.numero;
    opcion.textContent = region.nombre;
    seleccionarRegion.appendChild(opcion);
});

seleccionarRegion.addEventListener("change", function() {
    seleccionarComuna.innerHTML = '<option value="">-- Selecciona una comuna --</option>';
    seleccionarComuna.disabled = true;

    const regionSeleccionada = region_comuna.regiones.find(r => r.numero == this.value);

    if (regionSeleccionada) {
        regionSeleccionada.comunas.forEach(comuna => {
            const opcion = document.createElement("option");
            opcion.value = comuna.id;
            opcion.textContent = comuna.nombre;
            seleccionarComuna.appendChild(opcion);
        });
        seleccionarComuna.disabled = false;
    }
});
