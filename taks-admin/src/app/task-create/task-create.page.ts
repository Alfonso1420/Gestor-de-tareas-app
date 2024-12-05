import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.page.html',
  styleUrls: ['./task-create.page.scss'],
})
/*
Clase encargada de crear y editar tareas.
*/
export class TaskCreatePage implements OnInit {

  //Posicion en lista de tareas recibida por parametro para editar
  taskid:number=-1;

  //Objeto que almacena la tarea a guardar o editar 
  tarea = {
    nombre: '',categoria:'',  completa:false, editable:false
  }
  
  //Lista vacia para almacenar temporalmente categorias 
  listaCategorias = [{ nombre: '' , prioridad: 0, editable: false}];
  
  //Lista vaciapara posterior cargue desde local storage tareas
  listaTareas = [{ nombre: '', categoria: '', completa: false, editable: false }];



  constructor(private  router: Router, private route: ActivatedRoute) { 
  
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
          this.listarCategorias(); 
          this.cargarParametros(); 
      }
   })

  }

  ngOnInit() {
    this.listarCategorias(); 
     this.cargarParametros(); 

  }

   //Carga parametros recibidos por URL (id tarea )
   cargarParametros(){
    let listaJSON= localStorage.getItem('listaTareas'); 
    if(listaJSON!=null){
    this.listaTareas= JSON.parse(listaJSON); 
    }

    const idTarea=this.route.snapshot.queryParamMap.get('taskid'); 
    if(idTarea!=null){    

   if(listaJSON!=null){   
     this.tarea=this.listaTareas[Number(idTarea)]; 
     this.taskid=Number(idTarea )      
   }
   }
  }


   guardarTarea(){

      const tareaGuardadar=this.tarea.nombre;
      const categoriaGuardar=this.tarea.categoria; 
      //Si taskid es mayor o igual a 0  se recibio parametro , por lo tanto se actualiza registro
      //Si taskid es menor a 0 NO se recibio parametro, se guarda nuevo registro 
      
      
      if(this.taskid>=0){//ACCION: EDITAR
        this.listaTareas[this.taskid]=this.tarea;  
        console.log(this.listaTareas); 
             
      }else{
          //Logica para insertar una nueva tarea - ACCION: GUARDAR
      const lista=[{ 
        nombre: this.tarea.nombre, 
        categoria:this.tarea.categoria, 
       completa: false, 
       editable:false  }];
      //Si la lista de tareas esta vacia se guarda una lista con 1 registro (tarea actual).
    if(this.listaTareas.length==1 && this.listaTareas[0].nombre==''){
         this.listaTareas=lista;
      }else{
       this.listaTareas.push(lista[0]); 
      }
    this.tarea.nombre=''; 
     }
    //Guarda en el local storage la lista de tareas
    
    this.guardar(); 

    const mensaje='Se guardo correctamente la tarea: '+tareaGuardadar+' - '+ categoriaGuardar; 
    this.tarea.nombre=''; 
    this.tarea.categoria=''; 
    
    console.log('LISTA GUARDADA:'); 
    console.log(this.listaTareas);
    
     alert(mensaje); 
     this.listaTareasForm(); 


  }


   listaTareasForm(){
    this.router.navigate(['/tasks']);
  }


   //Metodo que guarda la lista de tareas en forma de array en el local storage
  guardar(){
    let listaJSON= JSON.stringify(this.listaTareas); 
     localStorage.setItem('listaTareas', listaJSON); 
  }

  
  listarCategorias(){
    let listaJSON= localStorage.getItem('listaCategorias'); 
    if(listaJSON!=null){
      this.listaCategorias= JSON.parse(listaJSON);      
    }
  
  }




}
