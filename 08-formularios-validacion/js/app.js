'use strict';

const form = document.getElementById('registro-form');
const btnSubmit = document.getElementById('btn-submit');
const mensajeExito = document.getElementById('mensaje-exito');
const passMeter = document.getElementById('pass-strength');

// función que habilita o deshabilita el botón de registro
function actualizarEstadoBoton() {
    let validado = true;
    const campos = form.querySelectorAll('input[required], select[required]');
    
    campos.forEach(input => {
        // si el campo no tiene la clase is-valid el formulario no está listo
        if (!input.classList.contains('is-valid')) {
            validado = false;
        }
    });

    btnSubmit.disabled = !validado;
}

// validación al perder el foco - Paso 4.1
form.addEventListener('focusout', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
        procesarValidacion(e.target);
        actualizarEstadoBoton(); // Revisar botón cada vez que se valida un campo
    }
});

// limpiar error al empezar a escribir (input) - Paso 4.2
form.addEventListener('input', (e) => {
    const input = e.target;
    input.classList.remove('is-invalid');
    const errorSpan = input.parentElement.querySelector('.error-msg');
    if (errorSpan) errorSpan.textContent = "";

    if (input.id === 'password') {
        const fuerza = Validacion.evaluarFuerzaPassword(input.value);
        passMeter.className = `strength-meter strength--${fuerza}`;
    }
    
    actualizarEstadoBoton();
});

function procesarValidacion(input) {
    // Validamos usando el objeto de validacion.js
    const resultado = Validacion.validarCampo(input);
    const errorSpan = input.parentElement.querySelector('.error-msg');

    if (!resultado.esValido) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        if (errorSpan) errorSpan.textContent = resultado.mensaje;
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (errorSpan) errorSpan.textContent = "";
    }
    return resultado.esValido;
}

// Registro del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    // se llama al paso 3.2
    const esValido = Validacion.validarFormulario(form);

    if (esValido) {
        const formData = new FormData(form);
        const datos = Object.fromEntries(formData);
        datos.terminos = document.getElementById('terminos').checked;

        console.log("✅ Registro exitoso:", datos);
        
        mensajeExito.classList.remove('oculto');
        form.reset();
        passMeter.className = 'strength-meter';
        btnSubmit.disabled = true;

        form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        setTimeout(() => mensajeExito.classList.add('oculto'), 5000);
    } else {
        console.log("❌ Error: Algunos campos no cumplen los requisitos.");
    }
});

document.getElementById('terminos').addEventListener('change', (e) => {
    procesarValidacion(e.target);
    actualizarEstadoBoton();
});

// Navegación con Enter entre campos
form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        // Evitamos que el Enter envíe el formulario antes de tiempo
        e.preventDefault();

        const campos = Array.from(form.querySelectorAll('input, select'));
        const indiceActual = campos.indexOf(e.target);

        // Si existe un siguiente campo, le damos el foco
        if (indiceActual > -1 && indiceActual < campos.length - 1) {
            campos[indiceActual + 1].focus();
        } else if (indiceActual === campos.length - 1 && !btnSubmit.disabled) {
            // Si es el último campo y el botón está habilitado, enviamos
            form.requestSubmit();
        }
    }
});