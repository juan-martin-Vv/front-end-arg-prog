import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { NO_TOKEN, TokenService } from '../token.service';
import { GolbalErrorHandlerService as errorHttp } from './golbal-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


  constructor(private tokenService: TokenService,
    private router: Router) { }
  url: String = environment.URL_API.concat('auth/login')
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let inReq = req.clone();


    const token = this.tokenService.getToken();
    // console.log("interceptor")
    if (token != null && !token.startsWith(NO_TOKEN)) {
      if (!inReq.url.endsWith('/login')) {
        inReq = this.addToken(req, token);
      }
      //inReq=req.clone({headers:req.headers.set("Authorization","Bearer "+token)});
      // console.log("Authorization passing");
    }
    return next.handle(inReq).pipe(
      catchError(
      (e:HttpErrorResponse)=> {
        return this.errorHandler(e, inReq,next);
      }
    ));
  }


    //   (error: HttpResponse<any>) => {
    //     let handled: boolean = false;
    //     //console.error(error);
    //     if (error instanceof HttpErrorResponse) {
    //       if (error.error instanceof ErrorEvent) {
    //         console.error("Error Event");
    //       } else {
    //         console.log(`error status : ${error.status} ${error.statusText} a pedido de ${inReq.url}`);
    //         switch (error.status) {
    //           case 400:

    //           case 401:      //login
    //             if (this.refresToken(error)) { //tomo la respuesta y verifico si hay refrest
    //               inReq = this.addToken(inReq, this.tokenService.getToken());
    //               return next.handle(inReq)
    //             }
    //             this.router.navigateByUrl("/login");
    //             handled = true;
    //             break;
    //           case 403:     //forbidden
    //             this.router.navigateByUrl("/");
    //             console.log(`redirect to login`);
    //             handled = true;
    //             break;
    //           case 0:
    //             //this.router.navigateByUrl("/");
    //             console.log(`ERR_CONNECTION_REFUSED`);
    //             handled = true;
    //             break;
    //         }
    //       }
    //     }
    //     else {
    //       console.error("Other Errors");
    //     }
    //     if (handled) {
    //       console.log('return back ');
    //       return throwError('Error de coneccion con el Back End');
    //     } else {
    //       console.log('throw error back to to the subscriber');
    //       return throwError(error);
    //     }
    //   })
    // )
  // }
  addToken(req: HttpRequest<any>, token: String): HttpRequest<any> {
    return req.clone({
      setHeaders:
        { Authorization: `Bearer ${token}` }
    });
  }
  //
  refresToken(req: HttpErrorResponse): boolean {
    let tokenRefres: string;
    //console.log('refrestoken :'+req.headers.get('Autorization-r'))
    if (req.headers.has('Autorization-r')) {
      //console.log('data :'+data)
      tokenRefres= req.headers.get('Autorization-r')?.split(' ')[1] || NO_TOKEN;
      //console.log('token :'+tokenRefres)
      this.tokenService.setToken(tokenRefres);//nuevo token refrescado
      if (!tokenRefres.startsWith(NO_TOKEN)) {    // token valido
        return true;
      }
    }
    return false;
  }
  //
  errorHandler(error: HttpErrorResponse,inReq:HttpRequest<any>,next:HttpHandler)
  {
    //  => {
      let handled: boolean = false;
      //console.error(error);
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          //console.error("Error Event");
        } else {
          console.log(`error status : ${error.status} ${error.statusText} a pedido de ${inReq.url}`);
          switch (error.status) {
            case 400:
              handled=true;
              //console.log(error)
              return throwError(error.error); //devuelvo el mensaje de API a componente
            case 401:      //login
              console.log('refress :'+this.refresToken(error))
              //console.log(error.error);
              if (this.refresToken(error)) { //tomo la respuesta y verifico si hay refrest
                console.log('refrescando')


                inReq = this.addToken(inReq, this.tokenService.getToken());
                return next.handle(inReq) // reintentamos con un nuevo token
                }

              this.router.navigateByUrl('/?login=off');
              return throwError('error session caducada')
            case 403:     //forbidden
              this.router.navigateByUrl("/erro");
              //console.log(`redirect to login`);
              handled = true;
              break;
            case 0:
              //this.router.navigateByUrl("/");
              //this.router.navigate(['/erro'],{queryParams:{on:true} });
              //this.router.navigate(['/results'], { queryParams: { page: 1 } });
              console.log(`ERR_CONNECTION_REFUSED`);
              handled = true;
              break;
          }
        }
      }
      else {
        console.error("Other Errors");
      }
      if (handled) {
        console.log('return back ');
        return throwError('Error de coneccion con el Back End');
      } else {
        console.log('throw error back to to the subscriber');
        return throwError(error);
      }
    }


  //
}
export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }]
