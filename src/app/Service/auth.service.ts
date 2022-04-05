import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../Class/jwt-dto';
import { Login } from '../Class/login';
import { NuevoUsuario } from '../Class/nuevo-usuario';
import { ConectorRestService } from './conector-rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  autURL=environment.URL_API+"auth/";
  constructor(
    private rest:ConectorRestService
    ) 
    { }
  public nuevoUser(nuevo:NuevoUsuario):Observable<NuevoUsuario>{
    return <Observable<NuevoUsuario>>this.rest.postRequest(this.autURL+"nuevo",nuevo);
  }
  public loginUser(userLogin:Login):Observable<JwtDto>{
    return <Observable<JwtDto>>this.rest.postRequest(this.autURL+"login",userLogin);
  }
}
