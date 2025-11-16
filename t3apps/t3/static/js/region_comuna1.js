

// Cuando cambia la región
document.getElementById('region').addEventListener('change', function() {
    var regionId = parseInt(this.value);
    var comunaSelect = document.getElementById('comuna');
    
    // Limpiar
    comunaSelect.innerHTML = '<option value="">-- Selecciona comuna --</option>';
    
    if (regionId) {
        // Filtrar comunas
        var comunasDeRegion = todasLasComunas.filter(function(comuna) {
            return comuna.region_id === regionId;
        });
        
        // Agregar opciones
        comunasDeRegion.forEach(function(comuna) {
            var option = document.createElement('option');
            option.value = comuna.id;
            option.textContent = comuna.nombre;
            comunaSelect.appendChild(option);
        });
    }
});