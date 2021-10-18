import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers:[AuthService]
})
export class ForgotPasswordComponent implements OnInit {

  userEmail = new FormControl('');

  constructor(private authSvc:AuthService,
              private toastr:ToastrService,
              private router:Router) { }

  ngOnInit(): void {
  }

  async onReset(){
    try{
      const email = this.userEmail.value;
      await this.authSvc.resetPassword(email);
      this.toastr.success('Mira en tu bandeja de entrada','¡Correo enviado!',{
        positionClass:'toast-bottom-right'
      });
      this.router.navigate(['/login']);
    } catch(error){console.log(error);
    }
  }
}