import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExperiencaFromTemplate, ExperienciaDTO } from 'src/app/Class/experency-class';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { ToastService } from 'src/app/toast/toast.service';


@Component({
  selector: 'app-experency-unit',
  templateUrl: './experency-unit.component.html',
  styleUrls: ['./experency-unit.component.css']
})
export class ExperencyUnitComponent implements OnInit {
  // @Input()
  // experList!:ExperencyClass;

  @Input()
  Dto!:ExperienciaDTO;
  @Input()
  isAdmin!: boolean;
  //
  @Output() outSignal: EventEmitter<number> = new EventEmitter<number>();
  //
  Form!: FormGroup;
  FormLabes: ControlModel<String>[] = ExperiencaFromTemplate;
  //
  butonId: String = 'proyectID';
  //
  errorMsg!: String;
  constructor(
    private formService: ControlService,
    private miApi: InyectorDataService,
    private cd: ChangeDetectorRef,
    private toastService: ToastService
  ) { }
  ngOnInit(): void {
    this.Form = this.formService.toFromGroup(this.FormLabes);
    this.Form.setValue(this.Dto);
    if (!this.isAdmin) //no se puede editar si no es admin
    {
      this.Form.disable()
      //console.log('form disable')
    }
    console.log(this.Dto);
    console.log('unit dto:')
    console.log(this.Form.getRawValue());
    //se generan id para todos lo modales
    this.butonId = this.butonId.concat(this.Dto.id?.toString() || '1');
  }
  deshacer():void{
    this.Form = this.formService.toFromGroup(this.FormLabes);
    this.Form.setValue(this.Dto);
    //console.log('cerrear task()')
  }
  isValid():boolean{
    return this.Form.valid;
  }
  editar(): void {
    let saveDto:ExperienciaDTO=<ExperienciaDTO>this.Form.getRawValue()
    if (this.isAdmin) {
      this.miApi.editarExperiencia(saveDto)
        .subscribe(
          d => {
            this.Dto = d;
            this.Dto.inicio=saveDto.inicio //para evitar el parseo de string -> date y vice
            this.Dto.fin=saveDto.fin       //para evitar el parseo de string -> date y vice
            //console.log("actualizado :", d.id);
          },
          e => {
            this.errorMsg = e
            this.toastService.danger('Error :' + e);
            this.cd.markForCheck();
          },
          () => {
            this.toastService.succes('Se edito correctamente: ' + this.Dto.puesto);
            this.Form = this.formService.toFromGroup(this.FormLabes);
            this.Form.setValue(this.Dto);
            this.cd.markForCheck();
          }
        )
    }
  }

  borrar(): void {
    let data: ExperienciaDTO;
    if (this.isAdmin) {
      this.miApi.borrarExperiencia(this.Dto.id || -1)
        .subscribe(
          d => {
            this.Form.reset();
            data = d
            console.log('brrado')
            this.toastService.danger('Se borro correctamente: ' + data.id);
            this.cd.markForCheck();
          },
          e => {
            this.errorMsg = e
            this.toastService.danger('Error :' + e);
          },
          () => {
            this.outSignal.emit(data.id || -1) // se emitio un peticion al servidor
            this.cd.markForCheck();
          }
        )
    }
  }
}
