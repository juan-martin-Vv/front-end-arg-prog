import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EducacionDTO, EducacionFormTemplate } from 'src/app/Class/education-class';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-education-unit',
  templateUrl: './education-unit.component.html',
  styleUrls: ['./education-unit.component.css']
})
export class EducationUnitComponent implements OnInit {

  @Input()
  Dto!:EducacionDTO;
  @Input()
  isAdmin!: boolean;
  //
  @Output() outSignal: EventEmitter<number> = new EventEmitter<number>();
  //
  Form!: FormGroup;
  FormLabes: ControlModel<String>[] = EducacionFormTemplate;
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
    // console.log(this.Dto);
    // console.log('unit dto:')
    // console.log(this.Form.getRawValue());
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
    let saveDto:EducacionDTO=<EducacionDTO>this.Form.getRawValue()
    if (this.isAdmin) {
      this.miApi.editarEducacion(saveDto)
        .subscribe(
          d => {
            this.Dto = d;
            this.Dto.inicio=saveDto.inicio
            this.Dto.fin=saveDto.fin
          },
          e => {
            this.errorMsg = e
            this.toastService.danger('Error :' + e);
            this.cd.markForCheck();
          },
          () => {
            this.toastService.succes('Se edito correctamente: ' + this.Dto.titulo);
            this.Form = this.formService.toFromGroup(this.FormLabes);
            this.Form.setValue(this.Dto);
            this.cd.markForCheck();
          }
        )
    }
  }

  borrar(): void {
    let data: EducacionDTO;
    if (this.isAdmin) {
      this.miApi.borrarEducacion(this.Dto.id || -1)
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
