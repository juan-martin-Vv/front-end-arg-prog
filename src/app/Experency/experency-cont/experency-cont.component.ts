import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  styleUrls: ['./experency-cont.component.css']
})
export class ExperencyContComponent implements OnInit, OnChanges {

  @Input()
  dni_actual!:number;
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
  ngOnChanges(changes: SimpleChanges): void {
    console.log("proyect dice: "+changes.dni_actual.currentValue);
    this.getData();
  }
  private getData():void{
    if(this.dni_actual!=null&&this.dni_actual!=0)
    this.miApi.cargarExperiencia(this.dni_actual).subscribe(
      d=>{
        this.Dto=d;
      },
      e=>{
        this.toast.show('Error :'+e)
      },
      ()=>{
        this.admin=this.tokenService.isAdmin();
        this.cd.markForCheck()
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
            this.saveForm.reset();
            this.saveForm.markAsUntouched();
            this.saveForm.clearValidators();
            this.cd.markForCheck()
          }
        )
    }
  }

  ngOnInit(): void {
    this.saveForm=this.miFromServic.toFromGroup(this.saveFormLabes);
  }
  Dto: ExperienciaDTO[] = [];
  titulo: String = "Experiencia Laboral";
}
