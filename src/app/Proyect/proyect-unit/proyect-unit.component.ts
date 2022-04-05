import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProyectFromTemplate, ProyectoDTO } from 'src/app/Class/proyect-class';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';


@Component({
  selector: 'app-proyect-unit',
  templateUrl: './proyect-unit.component.html',
  styleUrls: ['./proyect-unit.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProyectUnitComponent implements OnInit,OnChanges {

 /* @Input()
  misProyectos!:ProyectClass;*/
  @Input()
  proyDto!:ProyectoDTO;
  @Input()
  isAdmin!:boolean;
  //
  @Output()  outForm:EventEmitter<FormGroup>=new EventEmitter<FormGroup>();

  proyectForm!: FormGroup;
  proyectFormLabes: ControlModel<String>[]=ProyectFromTemplate;
  //
  butonId:String='proyect';
  //
  errorMsg!:String;
  constructor(
    private formService:ControlService,
    private miApi:InyectorDataService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    // this.proyectForm=this.formService.toFromGroup(this.proyectFormLabes);
    // this.proyectForm.setValue(this.proyDto);
    // console.log(this.proyectForm.getRawValue());

  }
  ngOnInit(): void {
    this.proyectForm=this.formService.toFromGroup(this.proyectFormLabes);
    this.proyectForm.setValue(this.proyDto);
    console.log(this.proyectForm.getRawValue());
    this.butonId=this.butonId.concat(this.proyDto.id?.toString()||'1');//se generan id para todos lo modales
  }
  editar():void{
    if (this.isAdmin) {
      this.miApi.editarProyectos(<ProyectoDTO>this.proyectForm.getRawValue())
      .subscribe(
        d=>{
          this.proyDto=d;
          console.log("actualizado :",d.id);
        },
        e=>{
          this.errorMsg=e
        },
        ()=>{
          this.outForm.emit(this.proyectForm);
        }
        )
    }
  }
  borrar():void{
    if (this.isAdmin) {

        this.miApi.borrarProyectos(this.proyDto.id||-1)
        .subscribe(
          d=>{
            this.proyectForm.reset();
            this.proyDto=this.proyectForm.getRawValue();
          },
          e=>{this.errorMsg=e}
        )
    }
  }
}
