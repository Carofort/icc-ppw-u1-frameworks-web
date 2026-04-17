'use strict'; 

// Declaración de variables
const nombre = 'Carolina';
const apellido = 'Fortmann';
let ciclo = 5;
const activo = true;

const direccion = {
    ciudad : 'Cuenca',
    provincia : 'Azuay',
};

console.table({nombre, apellido, ciclo, activo, direccion});  

const esMayorEdad = (edad) => edad >= 18;

const getSaludo = (nombre, hora) => hora < 12 
    ? `Buenos días, ${nombre}` 
    : hora < 18 
        ? `Buenas tardes, ${nombre}`
        : `Buenas noches, ${nombre}`;

// Mostrar en HTML un comentario
document.getElementById('nombre').textContent = `${nombre}`;
document.getElementById('apellido').textContent = `${apellido}`;
document.getElementById('ciclo').textContent = `${ciclo}`;

