import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class WardService implements CanActivate{

  constructor(
    private tokenService: TokenService,
    private router:Router
  ) { }
//   let rol: autoridad[];
//   if (window.sessionStorage.getItem(AUTHORITYS)) {
//     rol = JSON.parse(window.sessionStorage.getItem(AUTHORITYS) || "no se encontro nada");
//     rol?.forEach((e) => { this.roles.push(e.autoridad) })
//   }
//   return this.roles;
// }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    const rolEsperado = route.data['expectedRol'];
    const roles = this.tokenService.getAuthoritys();
    let isAdmin:boolean=false;
    if(roles!=null)
    roles.forEach(r=>{
        if(r.includes("ADMIN"))
        isAdmin=true;
      } )
      if (!isAdmin) {
        this.router.navigate(['/']);
      }
      return isAdmin;
  }
}
