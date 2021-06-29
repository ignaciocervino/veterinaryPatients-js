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

export default Citas;