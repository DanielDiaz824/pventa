import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvido-contra',
  templateUrl: './olvido-contra.component.html',
  styleUrls: ['./olvido-contra.component.css'],
  providers:[AuthService]
})
export class OlvidoContraComponent implements OnInit {

  usuarioCorreo = new FormControl('');

  constructor(private toastr:ToastrService,
              private router:Router,
              private authSvc:AuthService) { }

  ngOnInit(): void {
  }


  async onReset(){
      const correo = this.usuarioCorreo.value;
      this.authSvc.resetPassword(correo);
      this.toastr.success('Mira en tu bandeja de entrada','¡Correo enviado!',{
        positionClass:'toast-bottom-right'
      });
      this.router.navigate(['/login']);
  }

}
