import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProyectFromTemplate, ProyectoDTO } from 'src/app/Class/proyect-class';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { ToastService } from 'src/app/toast/toast.service';


@Component({
  selector: 'app-proyect-unit',
  templateUrl: './proyect-unit.component.html',
  styleUrls: ['./proyect-unit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProyectUnitComponent implements OnInit {

  @Input()
  proyDto!: ProyectoDTO;
  @Input()
  isAdmin!: boolean;
  //
  @Output() outSignal: EventEmitter<number> = new EventEmitter<number>();
  //
  proyectForm!: FormGroup;
  proyectFormLabes: ControlModel<String>[] = ProyectFromTemplate;
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
    this.proyectForm = this.formService.toFromGroup(this.proyectFormLabes);
    this.proyectForm.setValue(this.proyDto);
    if (!this.isAdmin) //no se puede editar si no es admin
    {
      this.proyectForm.disable()
      //console.log('form disable')
    }
    //console.log(this.proyectForm.getRawValue());
    //se generan id para todos lo modales
    this.butonId = this.butonId.concat(this.proyDto.id?.toString() || '1');
  }
  deshacer():void{
    this.proyectForm = this.formService.toFromGroup(this.proyectFormLabes);
    this.proyectForm.setValue(this.proyDto);
    //console.log('cerrear task()')
  }
  get isValid():boolean{
    return this.proyectForm.valid;
  }
  editar(): void {
    let data = new ProyectoDTO()
    data=<ProyectoDTO>this.proyectForm.getRawValue();
    if (this.isAdmin) {
      this.miApi.editarProyectos(data)
        .subscribe(
          d => {
            this.proyDto = d;
            //console.log("actualizado :", d.id);
          },
          e => {
            this.errorMsg = e
            this.toastService.danger('Error :' + e);
            this.cd.markForCheck();
          },
          () => {
            this.toastService.succes('Se edito correctamente: ' + this.proyDto.nombre);
            this.proyectForm = this.formService.toFromGroup(this.proyectFormLabes);
            this.proyectForm.setValue(this.proyDto);
            this.cd.markForCheck();
          }
        )
    }
  }

  borrar(): void {
    let data: ProyectoDTO;
    if (this.isAdmin) {
      this.miApi.borrarProyectos(this.proyDto.id || -1)
        .subscribe(
          d => {
            this.proyectForm.reset();
            data = d
            this.toastService.danger('Se borro correctamente: ' + data.nombre);
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
  gotoUrl(){
    window.open(this.proyDto.linkGit.includes('https://')?this.proyDto.linkGit.toString():`http://${this.proyDto.linkGit}`,"blank");
  }
}
