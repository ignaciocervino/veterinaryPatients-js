import App from './classes/App.js';

let DB;

window.onload = () => {
    const app = new App();

    crearDB();
}


function crearDB(){
    //crear la base de datos en version 1.0
    const crearDB = window.indexedDB.open('citas',1);

    //Si hay error
    crearDB.onerror = function(){
        console.log('Un error');
    }

    //Si todo sale bien
    crearDB.onsuccess = function(){
        console.log('DB creada');
        DB = crearDB.result;
    }

    //Definir el schema
    crearDB.onupgradeneeded = function(e){
        const db = e.target.result;

        const objectStore = db.createObjectStore('citas',{
            keyPath: 'id',
            autoIncrement: true
        });
        //Definir todas las columnas
        objectStore.createIndex('mascota','mascota',{unique:false});
        objectStore.createIndex('proprietario','proprietario',{unique:false});
        objectStore.createIndex('telefino','telefino',{unique:false});
        objectStore.createIndex('fecha','fecha',{unique:false});
        objectStore.createIndex('hora','hora',{unique:false});
        objectStore.createIndex('sintomas','sintomas',{unique:false});
        objectStore.createIndex('id','id',{unique:true});

        console.log('DB Creada y Lista');
    }
}


