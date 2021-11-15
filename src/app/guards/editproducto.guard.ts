import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditproductoGuard implements CanActivate {
  constructor(private authSvc:AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authSvc.afAuth.user.pipe(
        map(user=>{
          if(!user){
            alert('No logueado')
            this.router.navigate(['/home']);
            return false;
          }
          if(!user.emailVerified){
            alert('Cuenta no verificada.')
            this.router.navigate(['/verification-email']);
            return false;
          }
          //alert('Bienvenido Usuario Promedio')
          const userInf: any = user;
          console.log(userInf.uid);
          if(userInf.uid!=='a0kDjOVej7TvdvuHKP7y6sUFyQG3'){
            alert('No es admin');
            this.router.navigate(['/home']);
            return false;
          }
          return true;
        })
      );
  }
  
}
