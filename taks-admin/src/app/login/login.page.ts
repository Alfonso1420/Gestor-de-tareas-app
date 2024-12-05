import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = {
    email: '',
    clave:''
  }

  constructor(private  router: Router, public ngFireAuth: AngularFireAuth) { }

  ngOnInit() {

  }
  //Metodo para autenticar usuario mendiante conexion a firebase   
   async login(){
  
     
    if(this.usuario==null || this.usuario.email==null || this.usuario.clave==null || this.usuario.email=='' || this.usuario.clave==''){
      alert('Debe ingresar usuario y clave'); 
    }else{

      try {
    const user= await this.ngFireAuth.signInWithEmailAndPassword(this.usuario.email, this.usuario.clave);  
    
        if(user.user?.email){
          this.router.navigate(['/home']);   
        }else{
          alert('Error de Ingreso'); 
        }
  } catch(error) {  
    alert(error); 
  }
  }  
   }

   //Metodo que registra usuario en listado de firebase, mediante llamando de metodo createUserWithEmailAndPassword
   async registrar(){    
    const user= await this.ngFireAuth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.clave);
    console.log(user); 
    if(user.user?.email){
      alert('Registro exitoso'); 
    }else{
      alert('Error en el registro'); 
    }
    

   }

}
