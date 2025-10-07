const validadorSector = (sector) => sector && sector.length <= 100;
const validadorNombre = (nombre) => nombre && nombre.length >= 3 && nombre.length <= 200;
const validadorEmail = (email) => email && email.includes("@") && email.length<=100;
const validadorCelular = (celular) => celular && celular.includes("+569") && celular.length == 12;
const validadorURL = (url) => url && url.length >= 4 && url.length <= 50;
const validadorContacto = (contacto) => contacto !== "vacio";
const validadorTipo = (tipo) => tipo !== "vacio1";
const validadorUnidadMedidaEdad = (medida) => medida !== "vacio2";
const validadorFotos = (fotos) => fotos !== "";

const mostrarError  = (id, mostrar) => {
    const errorElement = document.getElementById(`error-${id}`);
    if (errorElement) {
        errorElement.style.display = mostrar ? 'block' : 'none';
    }
}

const validarFormulario = () => {
    let esValido = true;
    
    const sector = document.getElementById("sector").value;
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const celular = document.getElementById("celular").value;
    const url = document.getElementById("URL").value;
    const contacto = document.getElementById("contacto").value;
    const tipo = document.getElementById("tipo").value;
    const uedad = document.getElementById("uedad").value;
    const fotos = document.getElementById("foto1").value;
    
    if (!validadorSector(sector)) {
        mostrarError('sector', true);
        esValido = false;
    } else {
        mostrarError('sector', false);
    }
    
    if (!validadorNombre(nombre)) {
        mostrarError('nombre', true);
        esValido = false;
    } else {
        mostrarError('nombre', false);
    }
    
    if (!validadorEmail(email)) {
        mostrarError('email', true);
        esValido = false;
    } else {
        mostrarError('email', false);
    }
    
    if (!validadorCelular(celular)) {
        mostrarError('celular', true);
        esValido = false;
    } else {
        mostrarError('celular', false);
    }
    
    if (!validadorURL(url)) {
        mostrarError('url', true);
        esValido = false;
    } else {
        mostrarError('url', false);
    }
    
    if (!validadorContacto(contacto)) {
        mostrarError('contacto', true);
        esValido = false;
    } else {
        mostrarError('contacto', false);
    }
    
    if (!validadorTipo(tipo)) {
        mostrarError('tipo', true);
        esValido = false;
    } else {
        mostrarError('tipo', false);
    }
    
    if (!validadorUnidadMedidaEdad(uedad)) {
        mostrarError('uedad', true);
        esValido = false;
    } else {
        mostrarError('uedad', false);
    }
    
    if (!validadorFotos(fotos)) {
        mostrarError('foto', true);
        esValido = false;
    } else {
        mostrarError('foto', false);
    }
    
    return esValido;
};

const valFinal = () => {
  if (validarFormulario()) {
    document.getElementById('vent-emergente').style.display = 'flex';
    document.getElementById('btnsi').addEventListener('click', function() {
    alert('Formulario enviado con éxito');
    document.getElementById('vent-emergente').style.display = 'none'; 
    window.location.href = "index.html";
    });
    document.getElementById('btnNo').addEventListener('click', function() {
    document.getElementById('vent-emergente').style.display = 'none';
    });
  } else {
    alert('Por favor, complete todos los campos correctamente.');
  }
        
};

let btnEnviar=document.getElementById("enviar");
btnEnviar.addEventListener("click", valFinal);