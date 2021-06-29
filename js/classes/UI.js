import {eliminarCita,cargarEdicion,DB} from '../funciones.js'
import {contenedorCitas} from '../selectores.js'
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
    
    imprimirCitas(){//Distructuring desde el argumento de la funcion
        this.limpiarHTML();

        //Leer el contenido de la base de datos
        const objectStore = DB.transaction('citas').objectStore('citas');

        objectStore.openCursor().onsuccess = function(e){
            const cursor = e.target.result;

            if (cursor) {
                const{mascota,propietario,telefono,fecha,hora,sintomas, id} = cursor.value;

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

                //Ve al siguiente elemento
                cursor.continue();
            }
        }
    }

    limpiarHTML(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

export default UI;