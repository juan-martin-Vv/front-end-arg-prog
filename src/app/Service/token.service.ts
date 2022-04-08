import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

const TOKEN_KEY = "AUTH_TOKEN_IN";
const USER_NAME = "AUTH_USER_NAME_IN";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<String> = [];
  constructor() { }

  public setToken(token: String): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token.toString());
  }
  public getToken(): String {
    let l = window.sessionStorage.getItem(TOKEN_KEY) || "no TOKEN key storage";

    return l.toString();
  }
  //

  public getUserName(): String {
    let l = window.sessionStorage.getItem(USER_NAME) || "no USER key storage";
    return l.toString();
  }
  //

  public getAuthoritys(): String[] {
    this.roles = [];
    let token:string = this.getToken().toString();
    let rol: autoridad[];
    let raw!:String;
    let body:jwtApi;
    if (!token.includes("no TOKEN key storage"))
    {
        raw=token.split(".")[1];//token format eeee.yyyyyyy.zzzz [1]=yyyyyyy
        raw=Buffer.from(raw.toString(),'base64').toString('binary');//decoficamos
        //console.log(raw);
        //
        body=JSON.parse(raw.toString());
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
    if(this.getAuthoritys().indexOf('ROLL_ADMIN')>=0)
    {
      console.log("ADMIN detectado...")
      return true;
    }
    console.log("USER detectado...")
    return is_admin;
  }
  public isExpired():boolean{
    //this.roles = [];
    let token:string = this.getToken().toString();
    //let rol: autoridad[];
    let raw!:String;
    let body:jwtApi;
    let ixpiredDate:Date;
    if (!token.includes("no TOKEN key storage"))
    {
        raw=token.split(".")[1];//token format eeee.yyyyyyy.zzzz [1]=yyyyyyy
        raw=Buffer.from(raw.toString(),'base64').toString('binary');//decoficamos
        //console.log(raw);
        //
        body=JSON.parse(raw.toString());
        //rol = body.privilegios;
        //console.log(rol);
        //rol?.forEach((e) => { this.roles.push(e.authority) });
        ixpiredDate=new Date(body.exp.valueOf());
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
interface jwtApi{
  sub:String,
  email:String,
  privilegios:autoridad[],
  iat:Number,
  exp:Number
}

