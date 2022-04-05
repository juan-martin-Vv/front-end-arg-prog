import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from './control/control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlModel } from './control-model';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    ControlComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    ControlComponent,
  ]
})
export class FormularioModule { }
