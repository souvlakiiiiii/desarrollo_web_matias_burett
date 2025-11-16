document.addEventListener('DOMContentLoaded', function() {
    
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-evaluar')) {
            const btnEvaluar = event.target;
            const avisoId = btnEvaluar.getAttribute('data-id');
            
            const selectNota = document.getElementById('notas-' + avisoId);
            const btnEnviarFila = document.getElementById('btn-enviar-' + avisoId);
            
            if (selectNota) selectNota.removeAttribute('hidden');
            if (btnEnviarFila) btnEnviarFila.removeAttribute('hidden');
        }
        
        if (event.target.classList.contains('btn-enviar')) {
            const btnEnviarFila = event.target;
            const avisoId = btnEnviarFila.getAttribute('data-id');
            
            const selectNota = document.getElementById('notas-' + avisoId);
            
            if (selectNota) {
                const nota = selectNota.value;
                
                if(!nota || nota === 'vacio') {
                    alert('Selecciona nota por favor');
                    return;
                } else {
                    selectNota.setAttribute('hidden','');
                    btnEnviarFila.setAttribute('hidden','');
                    enviarNota(avisoId, parseInt(nota));
                    selectNota.value='vacio';
                }
            }
        }
    });
});

const enviarNota = async (avisoId, nota) => {
    try {
        const respuesta = await fetch(`/avisos/${avisoId}/notas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nota: nota 
            })
        });

        if (!respuesta.ok) {
            throw new Error('Error del servidor');
        }

        const promedio = await respuesta.json();
        document.getElementById(`promedio-${avisoId}`).textContent = promedio.toFixed(1);
        
    } catch (error) {
        alert('No se pudo enviar la nota');
    }
}