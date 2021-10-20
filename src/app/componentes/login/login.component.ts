import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { InicioComponent } from '../inicio/inicio.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})


export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  
  public user$:Observable<any> = this.authSvc.afAuth.user;
  public userpermissioncontrolinventario='none';
  constructor(private authSvc:AuthService,private router:Router,private toastr:ToastrService, private inicioUser: InicioComponent) { }

  ngOnInit(): void {
  }

   async onLogin(){
    this.userpermissioncontrolinventario='inline-block';
    const {email,password} = this.loginForm.value;
     try{
      const user = await this.authSvc.login(email,password);
      
      if(user && user.user.emailVerified){
        console.log(user);
        console.log('Usuario verificado:'+ user.user.emailVerified);
        this.inicioUser.verificarAuth();
        this.router.navigate(['/home']);
        //reloadxd
      }else if (user){
        this.router.navigate(['/verification-email']);
        console.log(user);
        this.inicioUser.verificarAuth();
        console.log('Usuario verificado:'+ user.user.emailVerified);
        console.log('No estas verificado');
      }else{
        //this.router.navigate(['/createaccount']);
      }
     }
     catch(error){
      console.log(error)
     }
    }
    async onLogout(){
      try{
        await this.authSvc.logout();
        this.router.navigate(['/login']);
      } catch(error){
        console.log(error);
      }
      this.authSvc.logout();
    }
}
