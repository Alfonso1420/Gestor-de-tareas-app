import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  tarea = {
    nombre: ''
  }
  listaTareas = [{ nombre: 'Iniciar Proyecto', completa: false, editable: false }];


  constructor() { }

  ngOnInit() {
    this.listarDesdeAlmacenamientoLocal(); 

  }


  guardarTarea(){
   console.log(this.tarea.nombre); 
   this.listaTareas.push({
    nombre: this.tarea.nombre,
    completa: false,
    editable: false
  }); 
    this.tarea.nombre=''; 
    this.guardar(); 
  }


  cambiarEstado(item: number) {
    console.log(this.listaTareas);
    this.listaTareas[item].completa = !this.listaTareas[item].completa;
    this.guardar(); 
  }

  //Metodo que elimina una tarea del local array y actuliza storage
  eliminar(item: number){
    var eliminar=this.listaTareas[item].nombre; 
    var numero=item+1;    
    this.listaTareas.splice(item, 1);   
    this.guardar();
    alert('Se elimino la tarea '+numero+'-'+eliminar);  

  }
  

//Metodo que guarda la lista de tareas en forma de array en el local storage
  guardar(){
    let listaJSON= JSON.stringify(this.listaTareas); 
     localStorage.setItem('listaTareas', listaJSON); 

  }
 

  listarDesdeAlmacenamientoLocal(){
    let listaJSON= localStorage.getItem('listaTareas'); 
    if(listaJSON!=null){
      this.listaTareas= JSON.parse(listaJSON); 
    }
  }





}
