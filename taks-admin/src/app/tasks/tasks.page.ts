import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})

/*Clase encargada de listar las tareas desde el local storage e iniciar operaciones: agregar tarea, edita, eliminar y filtra*/
export class TasksPage implements OnInit {

 //Filtro de busqueda por defecto para las tareas.
  categoriaSelect='Todas';
  
  //Objeto vacio para almacenar la tarea a editar. 
  tarea = {
    nombre: '', categoria:'',  completa:false, editable:false
  }
  //lista vacia para listar las tareas del local storage
  listaTareas = [{ nombre: '', categoria:'',  completa: false, editable: false }];
  
  //lista vacia para almacenar la categorias
  listaCategorias = [{ nombre: '' , prioridad: 0, editable: false}];


  constructor(private  router: Router){ 
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
          this.listarTareas(); 
          this.listarCategorias();
          
      }
   })

  }

  ngOnInit() {
    this.listarTareas(); 
  }

  nuevaTareaForm(){
    this.router.navigate(['/task-create']);
  }
  
  nuevaCategoriaForm(){
    this.router.navigate(['/categories']);
  }

  //Metodo para guardar la tarea o editarla 
  guardarTarea(){
    const lista=[{  nombre: this.tarea.nombre, categoria:this.tarea.categoria,
      completa: false, editable:false  }]; 
    if(this.listaTareas.length==1 && this.listaTareas[0].nombre==''){
      this.listaTareas=lista;
     }else{
      this.listaTareas.push(lista[0]);
    }
    this.tarea.nombre=''; 
    this.guardar(); 

  }

  //Metodo para cambiar el estado de una tarea despues del evento checkbox
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
 
  editar(item:number){       
    this.router.navigate(['/task-create'],
      { queryParams: { taskid: item } }
    );
  }
  guardarModificacion(item:number){

  }


//Metodo que guarda la lista de tareas en forma de array en el local storage
  guardar(){
    let listaJSON= JSON.stringify(this.listaTareas); 
     localStorage.setItem('listaTareas', listaJSON); 

  }
 
// Metodo para listar tareas desde el almacenamiento local 
  listarTareas(){
    let listaJSON= localStorage.getItem('listaTareas'); 
    if(listaJSON!=null){
      this.listaTareas= JSON.parse(listaJSON); 
    }
  }
//Metodo para listar tareas por categoria. 
  listarTareaPorCategoria(category:string){  
    this.listarTareas();  
    if(category!='' && category!='Todas'){
      for(var i=0;i<this.listaTareas.length; i++){
        if(this.listaTareas[i].categoria!=category){
          this.listaTareas.splice(i, 1); 
        }
      }

    }
  }
 
  //Metodo para lista todas las tareas del local storage
  listarCategorias(){
    let listaJSON= localStorage.getItem('listaCategorias'); 
    if(listaJSON!=null){
      this.listaCategorias= JSON.parse(listaJSON);      
    }
  
  }
  //Evento cuando se selecciona una categoria para filtrar los resultados
  selectEvent(){   
    this.listarTareaPorCategoria(this.categoriaSelect);    
  }







}
