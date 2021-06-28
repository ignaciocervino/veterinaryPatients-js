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
class Citas{
    constructor(){
        this.citas = [];
    }
    agregarCita(cita){
        this.citas = [...this.citas,cita];
    }
    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
    editarCita(citaActualizada){
        //Si la cita y la cita actualizada matchean se reescribe todo el obj caso contrario mantenemos la cita actual
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);//Igual que foreach pero nos retorna el arreglo
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
    
    imprimirCitas({citas}){//Distructuring desde el argumento de la funcion
        this.limpiarHTML();

        citas.forEach(cita => {
            const{mascota,propietario,telefono,fecha,hora,sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title','font-weight-bolder');
            mascotaParrafo.textContent=mascota;
            console.log( mascotaParrafo.textContent);

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML=`
                <span class="font-weight-bolder"> Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML=`
                <span class="font-weight-bolder"> Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML=`
                <span class="font-weight-bolder"> Fecha: </span> ${fecha}
            `;
           
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML=`
                <span class="font-weight-bolder"> Hora: </span> ${hora}
            `;
            
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML=`
                <span class="font-weight-bolder"> Sintomas: </span> ${sintomas}
            `;

            //Boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`;

            btnEliminar.onclick = ()=>eliminarCita(id);

            //Boton para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn','btn-info');
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>`;

            btnEditar.onclick = ()=>cargarEdicion(cita);


            //Agregar los parrafos a div citas
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
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
