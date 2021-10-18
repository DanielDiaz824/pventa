import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authSvc: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
    return this.authSvc.afAuth.user.pipe(
      map(user=>{
        if(!user){
          alert('USTED NO ESTÁ LOGUEADO! >:C')
          this.router.navigate(['/login']);
          return false;
        }
        alert('Bienvenido Usuario Promedio, te quiero mucho <3')
        const userInf: any = user;
        console.log(userInf.uid);
        if(userInf.uid!='TMbJgxhqwgTzdPD9OgyEb0sVxAm2'){
          alert('espera... TU NO ERES EL ADMIN!!, SAQUESE ALV >:C')
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
  
}