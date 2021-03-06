import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectFromTemplate, ProyectoDTO } from 'src/app/Class/proyect-class';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-proyect-cont',
  templateUrl: './proyect-cont.component.html',
  styleUrls: ['./proyect-cont.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProyectContComponent implements OnInit {
  //@Input()
  dni_actual!:number;
  //
  admin!:boolean;
  //
  //
  saveProyectForm!:FormGroup;
  saveProyectFormLabes:ControlModel<String>[]=ProyectFromTemplate;
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
  private getData():void{
    if(this.dni_actual!=null&&this.dni_actual!=0)
    this.miApi.cargarProyectos(this.dni_actual).subscribe(
      d=>{
        this.proyDto=d;
      },
      e=>{
        this.toast.show('Error :'+e)
      },
      ()=>{
        //this.admin=this.tokenService.isAdmin();
        this.cd.markForCheck()
      }
    );
  }
  get isValid():Boolean{
    return this.saveProyectForm.valid;
  }
  iniciaForm(){
    this.saveProyectForm.reset();
  }
  signal(inSingal: number):void{
    let array:ProyectoDTO[]=[];
    //console.log('signal :'+inSingal)
    this.proyDto.forEach( d=>{
      if (d.id!=inSingal) {
        array=[...array,d]
      }
    })
    this.proyDto=array;
    this.cd.markForCheck();
  }

  guardar():void{
    let saveProyect:ProyectoDTO;
    saveProyect=<ProyectoDTO>this.saveProyectForm.getRawValue();
    if (this.tokenService.isAdmin()) {
        this.miApi.guardarProyectos(this.dni_actual,saveProyect)
        .subscribe(
          d=>{
            this.proyDto.push(d);
            this.toast.succes("Se guardo correctamente :"+d.nombre)
          },
          e=>{
            this.toast.danger('Se produjo un error : '+e)
            this.router.navigateByUrl('/')
          },
          ()=>{
            this.saveProyectForm=this.miFromServic.toFromGroup(this.saveProyectFormLabes);
            //this.saveProyectForm.reset();
            this.cd.markForCheck()
          }
        )
    }
  }

  ngOnInit(): void {
    // console.log('proyect on!');
    this.miApi.dni_actual.subscribe(d=>{
      this.dni_actual=d;
      this.getData();
    }
      );
    this.tokenService.isAdminObs.subscribe(d=>{
      this.admin=d;
      this.cd.markForCheck();
    })
    this.saveProyectForm=this.miFromServic.toFromGroup(this.saveProyectFormLabes);
    this.getData();
  }
  proyDto:ProyectoDTO[]=[];
  tituloProyectos:String="Proyectos Encarados";
}
