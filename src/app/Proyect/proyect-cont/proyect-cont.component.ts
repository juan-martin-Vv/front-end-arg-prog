import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProyectFromTemplate, ProyectoDTO } from 'src/app/Class/proyect-class';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-proyect-cont',
  templateUrl: './proyect-cont.component.html',
  styleUrls: ['./proyect-cont.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProyectContComponent implements OnInit ,OnChanges{
  @Input()
  dni_actual!:number;
  //
  admin!:boolean;
  //
  saveProyectForm!:FormGroup;
  saveProyectFormLabes:ControlModel<String>[]=ProyectFromTemplate;
  //
  constructor(
    private miApi:InyectorDataService,
    private miFromServic:ControlService,
    private tokenService:TokenService
    ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("proyect dice: "+changes.dni_actual.currentValue);
    if(this.dni_actual!=null&&this.dni_actual!=0)
    this.miApi.cargarProyectos(this.dni_actual).subscribe(
      d=>{
        this.proyDto=d;
        console.log("proyect dice :"+this.dni_actual);
      },
      e=>{
        throw e;
      },
      ()=>{
        this.admin=this.tokenService.isAdmin();
      }
    );
  }
  actualizar(d:FormGroup){

  }

  guardar():void{
    let saveProyect:ProyectoDTO;
    saveProyect=<ProyectoDTO>this.saveProyectForm.getRawValue();
    if (this.tokenService.isAdmin()) {
        this.miApi.guardarProyectos(this.dni_actual,saveProyect)
        .subscribe(
          d=>{
            this.proyDto.push(d);
          },
          e=>{}
        )
    }
  }
  //
  ngOnInit(): void {
    this.saveProyectForm=this.miFromServic.toFromGroup(this.saveProyectFormLabes);
    this.proyDto.push();
  }
  proyDto:ProyectoDTO[]=[];
  tituloProyectos:String="Proyectos encarados";
}
