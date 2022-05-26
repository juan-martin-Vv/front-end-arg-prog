import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilDTO, PerfilDTOInt, PerfilFromTemplate, PerfilType } from 'src/app/Class/perfil-class';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent implements OnInit {

//
//    https://stackoverflow.com/questions/56414236/emit-an-event-through-service-in-angular!!!!!
//

  formPerfil!:FormGroup;
  formPerfilLabes:ControlModel<String>[]=PerfilFromTemplate;
  isAdmin!: boolean;
  dni_actual!:number;
  perfilDTO:PerfilDTO=new PerfilDTO();
  constructor(
    public modal:NgbActiveModal,
    private formService:ControlService,
    private autService:TokenService,
    private miApi: InyectorDataService,
    private toastService: ToastService,
    private cd :ChangeDetectorRef
    )
    {
      this.isAdmin=autService.isAdmin()
     }

  ngOnInit(): void {
    this.perfilDTO=new PerfilDTO();
    this.getData();
    this.formPerfil=this.formService.toFromGroup(PerfilFromTemplate);
    this.formPerfil.setValue(this.perfilDTO);
    // this.formPerfil.controls['fechaNacimiento'].setValue(new Date(1652929200000).toISOString());
    this.isAdmin=this.autService.isAdmin();
  }

  private getData():void{
    // console.log('on innit config')
    this.miApi.cargarPerfil().subscribe(
      d=>{
        this.perfilDTO=d;
        this.formPerfil.setValue(d);
        // console.log('get DAta',d);
        this.cd.markForCheck()
      },
      e=>{
        this.toastService.show('Error :'+e)
      },
      ()=>{
        this.isAdmin=this.autService.isAdmin();
        this.cd.markForCheck()
      }
    );
  }

  close(){
    this.modal.close();
  }
  isValid():boolean{
    return this.formPerfil.valid;
  }
  editar(): void {
    let data = new PerfilDTO();
    data=this.formPerfil.getRawValue();
    // console.log(data);
    if (this.isAdmin) {
      this.miApi.editarrPerfil(data)
        .subscribe(
          d => {
            this.perfilDTO =<PerfilDTOInt>d;
            this.perfilDTO.fechaNacimiento=data.fechaNacimiento;
          },
          e => {
            this.toastService.danger('Error :' + e);
            this.cd.markForCheck();
          },
          () => {
            this.toastService.succes('Se edito correctamente: ' + this.perfilDTO.nombre);
            this.formPerfil = this.formService.toFromGroup(this.formPerfilLabes);
            this.formPerfil.setValue(this.perfilDTO);
            // this.formPerfil.value.fechaNacimiento='2020-2-2';
            // console.log(this.perfilDTO.fechaNacimiento);
            // console.log(this.formPerfil)
            this.miApi.public_dni(this.perfilDTO.dni);//refrescamos todo!!
            this.cd.markForCheck();
          }
        )
    }
  }

  borrar(): void {
    let data: PerfilDTO;
    if (this.isAdmin) {
      this.miApi.borrarPerfil(this.perfilDTO.dni)
        .subscribe(
          d => {
            this.formPerfil.reset();
            data = d
            this.toastService.danger('Se borro correctamente: ' + data.nombre);
            this.cd.markForCheck();
          },
          e => {
            //this.errorMsg = e
            this.toastService.danger('Error :' + e);
          },
          () => {
            //this.outSignal.emit(data.id || -1) // se emitio un peticion al servidor
            this.cd.markForCheck();
          }
        )
    }
  }
}
