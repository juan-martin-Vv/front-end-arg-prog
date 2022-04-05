import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AboutClass } from 'src/app/Class/about-class';
import { AboutInterface } from 'src/app/Interface/about-interface';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit,OnChanges {

  @Input()
  dni_actual!:number;
  //
  dni_about!:number;
  constructor(
    private misDatosService:InyectorDataService,
   // private miServicio: ConectorRestService
     )
     { }

  ngOnChanges(changes: SimpleChanges): void {
    changes.dni_actual
    this.dni_about=changes.dni_actual.currentValue;
    console.log("about en dni:"+this.dni_about);
    //
    //this.miDatos=this.misDatosService.getDatos();
    //console.log("onInitabout dni:"+this.dni_about);
    if(this.dni_actual!=null&&this.dni_actual!=0)
    {
      console.log("about cargando dni:"+this.dni_about);
    this.misDatosService.cargarPerfil(this.dni_about).subscribe(
      d=>{
        this.miDatos.nombre=d.nombre;
        this.miDatos.apellido=d.apellido;
        this.miDatos.profesionalPerfil=d.nacionalidad!;
        console.log("about dice:"+this.dni_actual);
        //this.dni_actual=d.dni;
      },
      e=>{
        console.log(" error")
        //console.log(e);
        //throw e;
      }
    ) };

  }
  miDatos:AboutInterface=new AboutClass();
  datos!:AboutInterface;
  ngOnInit(): void {

  }

}
