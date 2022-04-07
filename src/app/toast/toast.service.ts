import {  Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });

  }
  succes(textOrTpl:string| TemplateRef<any>,t_delay?:number){
    this.show(textOrTpl,{ classname: 'bg-success bg-gradient text-white text-center fs-5', delay: t_delay });
  }
  danger(textOrTpl:string| TemplateRef<any>,t_delay?:number){
    this.show(textOrTpl,{ classname: 'bg-danger bg-gradient text-white text-center fs-5', delay: t_delay });
  }
  info(textOrTpl:string| TemplateRef<any>,t_delay?:number){
    this.show(textOrTpl,{ classname: 'bg-secondary bg-gradient text-white text-center fs-5', delay: t_delay });
  }

  remove(toast:any) {
    this.toasts = this.toasts.filter(t => t !== toast);

  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
