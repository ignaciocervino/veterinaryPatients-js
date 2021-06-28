/** VARIABLES */
//campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
//User interface
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

/** EVENT LISTENERS */
//Registrar eventos
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input',datosCita);
    propietarioInput.addEventListener('input',datosCita);
    telefonoInput.addEventListener('input',datosCita);
    fechaInput.addEventListener('input',datosCita);
    horaInput.addEventListener('input',datosCita);
    sintomasInput.addEventListener('input',datosCita);

}



/** OBJECTS */
//Objeto con la informacion de la cita
const citaObj= {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}


/** FUNCTIONS */
//Agrega datos al objeto de cita
function datosCita(e){
    citaObj[e.target.name] = e.target.value();
}