import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilDTO, PerfilFromTemplate } from 'src/app/Class/perfil-class';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { PerfilDTOInterface } from 'src/app/Interface/perfil-interface';
import { ConectorRestService } from 'src/app/Service/conector-rest.service';
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
  perfilDTO!:PerfilDTO;
  constructor(
    public modal:NgbActiveModal,
    private formService:ControlService,
    private autService:TokenService,
    private miApi: ConectorRestService,
    private toastService: ToastService,
    private cd :ChangeDetectorRef
    )
    {
      this.isAdmin=autService.isAdmin()
     }

  ngOnInit(): void {
    this.perfilDTO=new PerfilDTO();
    this.formPerfil=this.formService.toFromGroup(PerfilFromTemplate);
    this.getData()
    this.formPerfil.setValue(this.perfilDTO);
    console.log('perfil')
    console.log(this.perfilDTO)
    this.isAdmin=this.autService.isAdmin();
  }

  private getData():void{
    console.log('on innit config')
    this.miApi.getPerfil().subscribe(
      d=>{
        this.perfilDTO=d;
        this.formPerfil.setValue(d);
        console.log(d);
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
    if (this.isAdmin) {
      this.miApi.putPerfil(<PerfilDTOInterface>this.formPerfil.getRawValue())
        .subscribe(
          d => {
            this.perfilDTO =<PerfilDTOInterface> d;
            //console.log("actualizado :", d.id);
          },
          e => {
            //this.errorMsg = e
            this.toastService.danger('Error :' + e);
            this.cd.markForCheck();
          },
          () => {
            this.toastService.succes('Se edito correctamente: ' + this.perfilDTO.nombre);
            this.formPerfil = this.formService.toFromGroup(this.formPerfilLabes);
            this.formPerfil.setValue(this.perfilDTO);
            this.cd.markForCheck();
          }
        )
    }
  }

  borrar(): void {
    let data: PerfilDTO;
    if (this.isAdmin) {
      this.miApi.deletePerfil(this.perfilDTO.id || -1)
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
