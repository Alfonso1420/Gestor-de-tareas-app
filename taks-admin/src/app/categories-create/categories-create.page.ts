import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.page.html',
  styleUrls: ['./categories-create.page.scss'],
})
export class CategoriesCreatePage implements OnInit {


  //Posicion en lista de tareas recibida por parametro para editar
  categoriaId:number=-1;

  //Lista vacia para posterior cargue del listado de categorias desde el localstorage
  listaCategorias = [{ nombre: '' , prioridad: 0, editable: false}];
  categoria = {
    nombre: '', prioridad:0 , editable:false
  }

  
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
  }

  //Metodo que guarda categoria en la lista de categorias
  guardarCategoria(){
    
    const categoriaGuardar=this.categoria.nombre;
    const prioridadGuardar=this.categoria.prioridad; 

    //Si categoriaId es mayor o igual a 0  se recibio parametro , por lo tanto se actualiza registro
    //Si categoriaId es menor a 0 NO se recibio parametro, se guarda nuevo registro     
    if(this.categoriaId>=0){//ACCION: EDITAR
      this.listaCategorias[this.categoriaId]=this.categoria;  
      console.log(this.listaCategorias); 
           
    }else{ //Logica para insertar una nueva categoria - ACCION: GUARDAR

     if(this.listaCategorias.length==1 && this.listaCategorias[0].nombre==''){

      this.listaCategorias=[{  nombre: this.categoria.nombre, 
        prioridad: this.categoria.prioridad, 
        editable:false  }];

     }else{
      this.listaCategorias.push({
        nombre: this.categoria.nombre, 
        prioridad: this.categoria.prioridad, 
        editable:false  
      }); 

     }
   

   if(this.listaCategorias[0].nombre==''){    
    this.listaCategorias.slice(0,1); 
    }
  }
  
  //Guarda en el local storage la lista de categorias
  this.guardar(); 

  const mensaje='Se guardo correctamente la categoria: '+this.categoria.nombre+' - Prioridad:  '+ this.categoria.prioridad; 
  this.categoria.nombre=''; 
  this.categoria.prioridad=0;     
  alert(mensaje); 
  this.volverPaginaCategorias(); 
     
   }
  
   
//Metodo que guarda la lista de categorias en forma de array en el local storage
  guardar(){
     let listaJSON= JSON.stringify(this.listaCategorias); 
     localStorage.setItem('listaCategorias', listaJSON); 
  }


  eliminar(item: number){
    var eliminar=this.listaCategorias[item].nombre;  
    this.listaCategorias.splice(item, 1);   
    this.guardar();
    alert('Se elimino la categoria '+eliminar);  

  }  

  //Metodo que lista las categorias desde el localStorage
  listarCategorias(){
    let listaJSON= localStorage.getItem('listaCategorias'); 
    if(listaJSON!=null){
      this.listaCategorias= JSON.parse(listaJSON);      
    }
  }

  //Carga parametros recibidos por URL (categoria_id )
  cargarParametros(){

    let listaJSON= localStorage.getItem('listaCategorias'); 
    if(listaJSON!=null){
    this.listaCategorias= JSON.parse(listaJSON); 
    }

    const idCategoria=this.route.snapshot.queryParamMap.get('categoria_id'); 
    if(idCategoria!=null){
    
   if(listaJSON!=null){   
     this.categoria=this.listaCategorias[Number(idCategoria)]; 
     this.categoriaId=Number(idCategoria )      
   }
   }
  }


  volverPaginaCategorias(){
    this.router.navigate(['/categories']);
  } 

   listaTareasForm(){
    this.router.navigate(['/tasks']);

  }
  



}
