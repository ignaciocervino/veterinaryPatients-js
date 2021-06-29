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

let editando;

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

    if (editando) {
        ui.imprimirAlerta('Editado correctamente');

        //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});//Una copia de citaObj
        //Regresar el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        editando=false;//Quitar modo edicion
    }
    else{
        //Generar un id unico
        citaObj.id = Date.now();

        //Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});//Le paso una copia del objeto

        ui.imprimirAlerta('Se agrego correctamente');
    }

    

    //Reiniciar el objeto para la validacion
    reiniciarObjeto();

    formulario.reset(); // Reinicia el formulario

    //Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

function eliminarCita(id){
    //Eliminar la cita
    administrarCitas.eliminarCita(id);
    //Mostrar mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');
    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//Carga los datos y el modo edicion
function cargarEdicion(cita){
    const{mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;
    //Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;


    //Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
    
    editando=true;//Entro en modo edicion

}
