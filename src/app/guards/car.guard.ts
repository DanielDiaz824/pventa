import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarGuard implements CanActivate {
  constructor(private authSvc:AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authSvc.afAuth.user.pipe(
        map(user=>{
          if(!user){
            alert('USTED NO ESTÁ LOGUEADO! >:C')
            this.router.navigate(['/home']);
            return false;
          }
          alert('Bienvenido Usuario Promedio, te quiero mucho <3')
          const userInf: any = user;
          console.log(userInf.uid);
          if(userInf.uid=='s3OyXPySHPZqSQzTsMTehDdju4I3'){
            alert('espera...que demonios hace aqui, fred?!!!')
            this.router.navigate(['/home']);
            return false;
          }
          return true;
        })
      );
  }
  
}
