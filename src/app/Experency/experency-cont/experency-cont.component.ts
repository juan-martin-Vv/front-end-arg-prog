import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperencyClass, ExperiencaFromTemplate, ExperienciaDTO } from 'src/app/Class/experency-class';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-experency-cont',
  templateUrl: './experency-cont.component.html',
  styleUrls: ['./experency-cont.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ExperencyContComponent implements OnInit {

  //@Input()
  dni_actual:number=0;
  //
  admin!:boolean;
  //
  saveForm!:FormGroup;
  saveFormLabes:ControlModel<String>[]=ExperiencaFromTemplate;
  //
  chilSing!:boolean;
  constructor(
    private miApi:InyectorDataService,
    private miFromServic:ControlService,
    private tokenService:TokenService,
    private cd:ChangeDetectorRef,
    private toast:ToastService,
    private router:Router
    ) { }
  // ngDoCheck(): void {
  //   if (this.dni_actual==1) {
  //     console.log('do check')
  //   }

  //}
  private getData():void{
    if(this.dni_actual!=null&&this.dni_actual!=0)
    this.miApi.cargarExperiencia(this.dni_actual).subscribe(
      d=>{
        this.Dto=d;
        this.cd.markForCheck()
      },
      e=>{
        this.toast.show('Error :'+e)
      }
    );
  }
  iniciaForm(){
    this.saveForm.reset();
  }
  signal(inSingal: number):void{
    let array:ExperienciaDTO[]=[];
    console.log('signal :'+inSingal)
    this.Dto.forEach( d=>{
      if (d.id!=inSingal) {
        array=[...array,d]
      }
    })
    this.Dto=array;
    this.cd.markForCheck();
  }

  guardar():void{
    let saveDto:ExperienciaDTO;
    saveDto=<ExperienciaDTO>this.saveForm.getRawValue();
    if (this.tokenService.isAdmin()) {
        this.miApi.guardarExperiencia(this.dni_actual,saveDto)
        .subscribe(
          d=>{
            d.inicio=this.saveForm.value['inicio']
            d.fin=this.saveForm.value['fin']
            this.toast.succes("Se guardo correctamente :"+d.id)
            this.Dto.push(d)
          },
          e=>{
            this.toast.danger('Se produjo un error : '+e)
            this.router.navigateByUrl('/')
          },
          ()=>{
            this.saveForm=this.miFromServic.toFromGroup(this.saveFormLabes);
            this.cd.markForCheck()
          }
        )
    }
  }

  ngOnInit(): void {
    console.log('experiencia on!')
    this.saveForm=this.miFromServic.toFromGroup(this.saveFormLabes);
    this.miApi.dni_actual.subscribe(d=>{this.dni_actual=d;this.getData();});
    this.tokenService.isAdminObs.subscribe(d=>{this.admin=d;this.cd.markForCheck()});
    this.getData()
  }
  Dto: ExperienciaDTO[] = [];
  titulo: String = "Experiencia";
}
