import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css'],
  providers:[AuthService]
})
export class CreateaccountComponent implements OnInit {

  registerForm:FormGroup;

  

  constructor(private authSvc:AuthService,private router:Router, private toastr:ToastrService,private fb:FormBuilder) {

    this.registerForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
    })
   }

  ngOnInit(): void {
  }


  async onRegister(){
    console.log(this.registerForm.invalid);
    const {email,password} = this.registerForm.value;
    console.log(email,password)
    console.log(password.length);
    try{
      if(password.length<=7){
        this.toastr.error('La contraseña no cumple con el minimo de caracteres.', '¡Ha ocurrido un error!',{
          positionClass:'toast-bottom-right'
        });
      }else{
      const user = await this.authSvc.register(email,password);
      if(user!==null && user!==undefined && this.registerForm.invalid!==true){
        this.toastr.info('Verifica tu cuenta para continuar.', 'Completa tu registro',{
          positionClass:'toast-bottom-right'
        });
        this.router.navigate(['/verification-email']);
        //aqui
      }
      else{
        this.toastr.error('Verifica los datos o prueba con otro correo e intentalo denuevo.', '¡Ha ocurrido un error!',{
          positionClass:'toast-bottom-right'
        });
      }
    }
  }
    catch(error){
      this.toastr.error('Verifica los datos o prueba con otro correo e intentalo denuevo.', '¡Ha ocurrido un error!',{
        positionClass:'toast-bottom-right'
      });
      console.log(error);
    }
    }
    
  }
