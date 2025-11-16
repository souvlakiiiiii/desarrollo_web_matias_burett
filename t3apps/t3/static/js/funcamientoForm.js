document.addEventListener('DOMContentLoaded', function() {
    const validadorSector = (sector) => sector.length <= 100;
    const validadorNombre = (nombre) => nombre && nombre.length >= 3 && nombre.length <= 200;
    const validadorEmail = (email) => email && email.includes("@") && email.length <= 100;
    const validadorCelular = (celular) => (!celular) || (celular.includes("+569") && celular.length == 12);
    const validadorURL = (url) => url && url.length >= 4 && url.length <= 50;
    const validadorContacto = (contacto) => contacto !== "vacio";
    const validadorTipo = (tipo) => tipo !== "vacio1";
    const validadorUnidadMedidaEdad = (medida) => medida !== "vacio2";
    const validadorFotos = (fotos) => fotos !== "";

    const mostrarError = (id, mostrar) => {
        const errorElement = document.getElementById(`error-${id}`);
        if (errorElement) {
            errorElement.style.display = mostrar ? 'block' : 'none';
        }
    };

    const validarFotosAdicionales = () => {
        for (let i = 2; i <= 5; i++) {
            const fotoInput = document.getElementById(`foto${i}`);
            if (fotoInput && fotoInput.value) {
                if (!validadorFotos(fotoInput.value)) {
                    alert(`La foto ${i} no es válida.`);
                    return false;
                }
            }
        }
        return true;
    };

    const validarFormulario = () => {
        const sectorElem = document.getElementById("sector");
        if (!sectorElem) {
            return false;
        }

        const sector = sectorElem.value;
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const celular = document.getElementById("celular").value;
        const url = document.getElementById("URL").value;
        const contacto = document.getElementById("contacto").value;
        const tipo = document.getElementById("tipo").value;
        const uedad = document.getElementById("uedad").value;
        const fotos = document.getElementById("foto1").value;

        let contactosValidos = true;
        for (let i = 2; i <= 5; i++) {
            const contactoElem = document.getElementById(`contacto${i}`);
            const urlElem = document.getElementById(`URL${i}`);
            const contenedor = document.getElementById(`cont${i}`);

            if (contenedor && !contenedor.hidden) {
                const contactoVal = contactoElem ? contactoElem.value : '';
                const urlVal = urlElem ? urlElem.value : '';

                if ((contactoVal && contactoVal !== "vacio" && !urlVal) ||
                    (urlVal && (!contactoVal || contactoVal === "vacio"))) {
                    alert(`El contacto adicional ${i - 1} está incompleto. Complete ambos campos.`);
                    contactosValidos = false;
                    break;
                }

                if (urlVal && !validadorURL(urlVal)) {
                    alert(`La URL del contacto adicional ${i - 1} es inválida.`);
                    contactosValidos = false;
                    break;
                }
            }
        }

        if (!contactosValidos) {
            return false;
        }

        if (!validarFotosAdicionales()) {
            return false;
        }

        let esValido = true;

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
            mostrarError('URL', true);
            esValido = false;
        } else {
            mostrarError('URL', false);
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
            mostrarError('foto1', true);
            esValido = false;
        } else {
            mostrarError('foto1', false);
        }

        return esValido;
    };

    const btnEnviar = document.getElementById("enviar");
    if (btnEnviar) {
        btnEnviar.addEventListener("click", function (e) {
            e.preventDefault();

            if (validarFormulario()) {
                document.getElementById('vent-emergente').style.display = 'flex';
            } else {
                alert('Por favor, complete todos los campos correctamente.');
            }
        });
    }

    const btnSi = document.getElementById('btn-si');
    if (btnSi) {
        btnSi.addEventListener('click', function () {
            const form = document.querySelector('form');
            if (form) {
                form.submit();
            }
        });
    }

    const btnNo = document.getElementById('btn-no');
    if (btnNo) {
        btnNo.addEventListener('click', function () {
            const vent = document.getElementById('vent-emergente');
            if (vent) {
                vent.style.display = 'none';
            }
        });
    }

    const bcont1 = document.getElementById('bcont1');
    if (bcont1) {
        bcont1.addEventListener('click', function () {
            const cont2 = document.getElementById('cont2');
            if (cont2) cont2.hidden = false;
            bcont1.hidden = true;
        });
    }

    const bcont2 = document.getElementById('bcont2');
    if (bcont2) {
        bcont2.addEventListener('click', function () {
            const cont3 = document.getElementById('cont3');
            if (cont3) cont3.hidden = false;
            bcont2.hidden = true;
        });
    }

    const bcont3 = document.getElementById('bcont3');
    if (bcont3) {
        bcont3.addEventListener('click', function () {
            const cont4 = document.getElementById('cont4');
            if (cont4) cont4.hidden = false;
            bcont3.hidden = true;
        });
    }

    const bcont4 = document.getElementById('bcont4');
    if (bcont4) {
        bcont4.addEventListener('click', function () {
            const cont5 = document.getElementById('cont5');
            if (cont5) cont5.hidden = false;
            bcont4.hidden = true;
        });
    }
});
