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

    formulario.addEventListener('submit',nuevaCita);
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

/** CLASES */
//Clase para manejar citas
class Citas{
    constructor(){
        this.citas = [];
    }
    agregarCita(cita){
        this.citas = [...this.citas,cita];
    }
}

//Clase para UI
class UI{
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');
        //Agregar clase en base al tipo de error
        if (tipo === 'error') {
           // divMensaje.classList.remove('alert-success');
            divMensaje.classList.add('alert-danger');
        }
        else{
            //divMensaje.classList.remove('alert-danger');
            divMensaje.classList.add('alert-success');
        }

        //Mnesaje de error
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'));

        //Quitar la alerta despues de 3 segundos
        setTimeout(()=>{
            divMensaje.remove();
        },3000);
    }
}
const ui = new UI();
const administrarCitas = new Citas();

/** FUNCTIONS */
//Agrega datos al objeto de cita
function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

//Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();
    
    //Extraer info del objeto de cita
    const{mascota,propietario,telefono,fecha,hora,sintomas} = citaObj;

    //validar
    if (mascota === ''|| propietario === ''|| telefono === ''|| fecha === ''|| hora === ''|| sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }

    //Generar un id unico
    citaObj.id = Date.now();

    //Creando una nueva cita
    administrarCitas.agregarCita({...citaObj});//Le paso una copia del objeto

    //Reiniciar el objeto para la validacion
    reiniciarObjeto();

    formulario.reset(); // Reinicia el formulario

    //Mostrar el HTML de las citas
}

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

