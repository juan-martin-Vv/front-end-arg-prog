import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GolbalErrorHandlerService implements ErrorHandler {

  constructor() { }
  handleError(error: ErrorHandler | HttpErrorResponse| TimeoutError): void {
    console.log('erro capturado');
    console.log(error);
  }

}
export const ErrorHandlerProvider={provide:ErrorHandler,useClass:GolbalErrorHandlerService,multi:false}
