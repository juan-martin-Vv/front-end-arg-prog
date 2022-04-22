import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = "AUTH_TOKEN_IN";
const USER_NAME = "AUTH_USER_NAME_IN";
export const NO_TOKEN = 'no TOKEN key storage';

@Injectable({
  providedIn: 'root'
})

  // debo implementar esto para verificar si es admin !!!
  // https://stackoverflow.com/questions/56414236/emit-an-event-through-service-in-angular

export class TokenService {
  roles: Array<String> = [];
  constructor() { }

  private isAdminVar = new BehaviorSubject<boolean>(false);
  isAdminObs=this.isAdminVar.asObservable();
  //

  public setToken(token: String): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token.toString());
  }
  public getToken(): String {
    let l = window.sessionStorage.getItem(TOKEN_KEY) || NO_TOKEN;

    return l.toString();
  }
  //

  public getUserName(): String {
    let l = window.sessionStorage.getItem(USER_NAME) || NO_TOKEN;
    return l.toString();
  }
  //

  public getAuthoritys(): String[] {
    this.roles = [];
    let token: string = this.getToken().toString();
    let rol: autoridad[];
    let raw!: String;
    let body: jwtApi;
    if (!token.includes(NO_TOKEN)) {
      raw = token.split(".")[1];//token format eeee.yyyyyyy.zzzz [1]=yyyyyyy
      raw = Buffer.from(raw.toString(), 'base64').toString('binary');//decoficamos
      //console.log(raw);
      //
      body = JSON.parse(raw.toString());
      rol = body.privilegios;
      //console.log(rol);
      rol?.forEach((e) => { this.roles.push(e.authority) });
    }
    console.log("roles:");
    console.log(this.roles);
    return this.roles;
  }
  public logout(): void {
    window.sessionStorage.clear();
  }
  public isAdmin(): boolean {
    let is_admin: boolean = false;
    if (this.getAuthoritys().indexOf('ROLL_ADMIN') >= 0) {
      console.log("ADMIN detectado...")
      is_admin=true;
      this.isAdminVar.next(is_admin);
      return is_admin;
    }
    console.log("USER detectado...")
    this.isAdminVar.next(is_admin);
    return is_admin;
  }
  public isExpired(): boolean {
    //this.roles = [];
    let token: string = this.getToken().toString();
    //let rol: autoridad[];
    let raw!: String;
    let body: jwtApi;
    let ixpiredDate: Date;
    if (!token.includes(NO_TOKEN)) {
      raw = token.split(".")[1];//token format eeee.yyyyyyy.zzzz [1]=yyyyyyy
      raw = Buffer.from(raw.toString(), 'base64').toString('binary');//decoficamos
      //console.log(raw);
      //
      body = JSON.parse(raw.toString());
      //rol = body.privilegios;
      //console.log(rol);
      //rol?.forEach((e) => { this.roles.push(e.authority) });
      ixpiredDate = new Date(body.exp.valueOf());
      //console.log(ixpiredDate.getUTCMilliseconds());
    }
    //console.log("roles:");
    //console.log(this.roles);
    return true;
  }
}
interface autoridad {
  authority: String;
}
// {
//   "sub": "pepeLoco",
//   "email": "admin@admin.ad",
//   "privilegios": [
//     {
//       "authority": "ROLL_ADMIN"
//     },
//     {
//       "authority": "ROLL_USER"
//     }
//   ],
//   "iat": 1648435844,
//   "exp": 1648439444
//}
interface jwtApi {
  sub: String,
  email: String,
  privilegios: autoridad[],
  iat: Number,
  exp: Number
}

