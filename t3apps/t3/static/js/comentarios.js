async function obtenerComentarios(aviso_id){
  try{
    const v1 = await fetch(`/comentarios/${aviso_id}`);
    if(!v1.ok){
      throw new Error(`error de red: ${v1.status} - ${v1.statusText}`);
    }
    const datos = await v1.json();
    return datos;

  } catch(error){
    console.error("falló", error);
    return null;
  }
}

async function cargarComentarios(aviso_id){
  const nombre = document.getElementById("nombre-com").value.trim();;
  const texto = document.getElementById("agregar-com").value.trim();;

  const datos = new FormData();
  datos.append("nombre-com", nombre);
  datos.append("agregar-com", texto);

  const jola = await fetch(`/comentarios/agregar/${aviso_id}`, {method: "POST", body: datos})
   if (!jola.ok) {
        throw new Error(`Error al enviar comentario: ${jola.status}`);
    }
  return jola
}

