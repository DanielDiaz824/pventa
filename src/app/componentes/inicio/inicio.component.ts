import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers:[AuthService]
})
export class InicioComponent {
  public user$:Observable<any> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService,private router:Router) { }
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
