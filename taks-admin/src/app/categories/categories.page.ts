import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
import { AngularFireRemoteConfig} from '@angular/fire/compat/remote-config'; 


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

 
  //Lista  de categorias almacenas en local storage
  listaCategorias = [{ nombre: '' , prioridad: 0, editable: false}];

  //Obejto que almacena la categoria a editar 
  categoria = {
    nombre: '', prioridad:0 , editable:false
  }

  permitirAgregarCategorias= false; 
  mensajeError=''; 

  
  constructor(private  router: Router,   
     private remoteConfig: AngularFireRemoteConfig
    
    ){    
      
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        
          this.listarCategorias();
      }
   });

  }

  ngOnInit() {
    this.listarCategorias();     
    this.obtenerParametroRemoto(); 
  }

  //Metodo que consulta remote Config en firebase
  async obtenerParametroRemoto() {
    try {
      // Consulta y activa la configuracion remota 
      await this.remoteConfig.fetchAndActivate();

      // Optiene configuracion por nombre de parametro 
      //Parametro AGREGAR_CATEGORIAS retorna 1 cuando esta activa la opcion de crear categorias nuevas; de lo contrario retorna 0 
      const  configValue = (await this.remoteConfig.getValue('AGREGAR_CATEGORIAS'));
      
      //Convierte el valor optenido en json 
       const jsonValue= JSON.parse(configValue.asString());
      
      if(jsonValue=='1'){
        this.permitirAgregarCategorias=true; 
      }else{this.permitirAgregarCategorias=false; }
  
      
    } catch (error) {
      console.error('Error fetching remote config:', error);
    }
  }


  //Metodo que guarda categoria en la lista de categorias
  guardarCategoria(){

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

    const mensaje='Se guardo correctamente la categoria: '+this.categoria.nombre+' - Prioridad:  '+ this.categoria.prioridad; 
     this.categoria.nombre=''; 
     this.categoria.prioridad=0; 
     this.guardar(); 
     alert(mensaje); 
     
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
  
 
  //Metodo que vuelve a la vista del lista de tareas 
   listaTareasForm(){
    this.router.navigate(['/tasks']);

  }

  //Metodo que lista las categorias desde el local storage
  listarCategorias(){
    let listaJSON= localStorage.getItem('listaCategorias'); 
    if(listaJSON!=null){
      this.listaCategorias= JSON.parse(listaJSON);      
    }
  }


  editar(item:number){
       
    this.router.navigate(['/categories-create'],
      { queryParams: { categoria_id: item } }


    );

  }



}
