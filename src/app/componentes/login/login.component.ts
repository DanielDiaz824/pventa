import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  
  constructor(private authSvc:AuthService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

   async onLogin(){
     
    const {email,password} = this.loginForm.value;
     try{
      const user = await this.authSvc.login(email,password);

      if (user && user.user.emailVerified){
        this.router.navigate(['/home']);
        this.toastr.success('SECT T te de la bienvenida','¡Bienvenid@!',{
          positionClass:'toast-bottom-right'
        });
      } else if (user){
        this.router.navigate(['/verification-email']);
      } else{
        this.router.navigate(['/login']);
      }
     }
     catch(error){
      console.log(error)
     }
    }
}
