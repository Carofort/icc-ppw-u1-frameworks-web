'use strict';

const Validacion = {
    // regex personalizadas - Requisito Paso 3.4
    regex: {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        telefono: /^[0-9]{10}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ // Min 8, Mayús, Min, Núm
    },

    validarCampo(campo) {  // valida un campo individual - Paso 3.1
        const valor = campo.value.trim();
        const tipo = campo.id;
        let esValido = true;
        let mensaje = "";

        // validar campo obligatorio
        if (campo.required && (valor === "" || (campo.type === 'checkbox' && !campo.checked))) {
            return { esValido: false, mensaje: "Este campo es obligatorio" };
        }

        // mensajes de error especificos por tipo de error - Paso 3.3
        switch (tipo) {
            case 'nombre':
                if (valor.length < 3) {
                    esValido = false;
                    mensaje = "El nombre debe tener al menos 3 caracteres";
                }
                break;
            case 'email':
                if (!this.regex.email.test(valor)) {
                    esValido = false;
                    mensaje = "Ingrese un correo válido";
                }
                break;
            case 'telefono':
                if (!this.regex.telefono.test(valor)) {
                    esValido = false;
                    mensaje = "Deben ser exactamente 10 dígitos numéricos";
                }
                break;
            case 'fechaNacimiento':
                if (!this.esMayorEdad(valor)) {
                    esValido = false;
                    mensaje = "Debes ser mayor de edad (+18)";
                }
                break;
            case 'password':
                if (!this.regex.password.test(valor)) {
                    esValido = false;
                    mensaje = "Mín. 8 caracteres, una mayúscula, una minúscula y un número";
                }
                break;
            case 'confirmPassword':
                const passOriginal = document.getElementById('password').value;
                if (valor !== passOriginal) {
                    esValido = false;
                    mensaje = "Las contraseñas no coinciden";
                }
                break;
        }

        return { esValido, mensaje };
    },

    /**
     * validar todos los campos del formulario - 3.2
     * @param {HTMLFormElement} form 
     * @returns {boolean}
     */
    validarFormulario(form) {
        const campos = Array.from(form.querySelectorAll('input, select'));
        let formularioEsValido = true;

        campos.forEach(campo => {
            // la misma lógica de validación individual
            const resultado = this.validarCampo(campo);
            if (!resultado.esValido) {
                formularioEsValido = false;
            }
        });

        return formularioEsValido;
    },

    esMayorEdad(fechaStr) {
        const hoy = new Date();
        const cumple = new Date(fechaStr);
        let edad = hoy.getFullYear() - cumple.getFullYear();
        const m = hoy.getMonth() - cumple.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) edad--;
        return edad >= 18;
    },

    evaluarFuerzaPassword(pass) {
        if (pass.length === 0) return '';
        if (this.regex.password.test(pass)) return 'high';
        if (pass.length >= 6) return 'medium';
        return 'low';
    }
};