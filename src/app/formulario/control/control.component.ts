import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ControlModel } from '../control-model';

@Component({
  selector: 'sheld-control',
  template: `
  <ng-container *ngIf="etiquetas.controlType=='nullField' else fieldControl"></ng-container> <!--no se dibuja -->
   <ng-template #fieldControl>
   <div [formGroup]="form" class="form-control gap-1">
    <label [attr.for]="etiquetas.key" class="form-label">{{etiquetas.label}}
    </label>
    <div [ngSwitch]="etiquetas.controlType" >
      <input  *ngSwitchCase="'label'"
        [formControlName]="etiquetas.key"
        [id]="etiquetas.key+formName"
        [type]="etiquetas.type"
        [value]="etiquetas.value"
        readonly
        class='form-control-plaintext'
      >
      <input  *ngSwitchCase="'textbox'"
        [formControlName]="etiquetas.key"
        [id]="etiquetas.key+formName"
        [type]="etiquetas.type"
        [ngClass]="etiquetas.required?
        (form.untouched?  'form-control' :( isValid? 'form-control is-valid':'form-control is-invalid' ))
        : 'form-control'"
        >
      <select *ngSwitchCase="'dropdown'" [formControlName]="etiquetas.key" [id]="etiquetas.key">
        <option *ngFor="let opcion of etiquetas.options" [value]="opcion.key">{{opcion.value}}</option>
      </select>
    </div>

    <div class="text-danger border-2 text-center"[hidden]="isValid || form.untouched" [attr.for]="etiquetas.key+formName">{{getError(etiquetas.key)}}</div>
    </div>
  </ng-template>
`,
  styleUrls: ['./control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent implements OnInit {

  @Input()
  etiquetas!: ControlModel<String>;
  @Input()
  form!: FormGroup;
  formName: String = '';
  error: string = "error";
  constructor() { }

  ngOnInit(): void {
    this.formName = Math.random().toString();
  }
  get isValid() {
    return this.form.controls[this.etiquetas.key].valid;
  }
  getError(key: string): string[] {
    let errores: string[] = [];
    //Object.keys(this.form.controls).forEach(key => {
    const controlErrors: ValidationErrors = <ValidationErrors>this.form.controls[key].errors;

    if (controlErrors != null) {
      //console.log("error en el control: " + key);
      Object.keys(controlErrors).forEach(keyError => {
        // console.log(' keyError: ' + keyError + ', value: ' + controlErrors[keyError]);
        this.etiquetas.restricciones.forEach(res => {
          if (res.restriccion.includes(keyError)) {
            errores = [...errores, res.errores || keyError]
            //errores.push(res.errores || keyError);
          }
        })
      });
    }
    return errores;
  }
}
