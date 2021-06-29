import App from './classes/App.js';
import {DB,crearDB} from './funciones.js';

window.onload = () => {
    const app = new App();

    crearDB();
}





