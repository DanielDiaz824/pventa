import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
  providers:[AuthService],
})
export class SendEmailComponent {
  public user$:Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc:AuthService,private toastr:ToastrService) { }

  onSendEmail(){
    this.authSvc.sendVerificationEmail();
    this.toastr.success('Correo enviado con exito. Verifica tu correo electronico', 'Correo Enviado',{
      positionClass:'toast-bottom-right'
    });
  }
}
