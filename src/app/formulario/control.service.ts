import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlModel } from './control-model';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  constructor() { }
  toFromGroup(proyectos: ControlModel<String>[]): FormGroup {
    let grupo: any = {};
    proyectos.forEach(proyecto => {
      // grupo[proyecto.key] = proyecto.required ? //agregar el array de restricciones en [requiered.req,requiered.mail...]
      //                       new FormControl(proyecto.value || '', [Validators.required]) :
      //                       new FormControl(proyecto.value);
      grupo[proyecto.key]= new FormControl(proyecto.value);
      proyecto.restricciones.forEach(restriccion => {
        if (restriccion.restriccion.includes('required')) {
          <FormControl>grupo[proyecto.key].addValidators(Validators.required);
        }
        if (restriccion.restriccion.includes('email')) {
          grupo[proyecto.key].addValidators(Validators.email);
        }
        if (restriccion.restriccion.includes('pattern')) {
          <FormControl>grupo[proyecto.key].addValidators(Validators.pattern(restriccion.valor||''));
        }
        if (restriccion.restriccion.includes('maxlength')) {
          <FormControl>grupo[proyecto.key].addValidators(Validators.maxLength(Number(restriccion.valor)||100));
        }
        if (restriccion.restriccion.includes('minlength')) {
          grupo[proyecto.key].addValidators(Validators.minLength(Number(restriccion.valor)||1));
        }
      }
      );
    });
    return new FormGroup(grupo);
  }
}
