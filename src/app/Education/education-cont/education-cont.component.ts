import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EducacionDTO } from 'src/app/Class/education-class';
import { PerfilDTO } from 'src/app/Class/perfil-class';
import { EducationInterface } from 'src/app/Interface/education-interface';

import { InyectorDataService } from 'src/app/Service/inyector-data.service';

@Component({
  selector: 'app-education-cont',
  templateUrl: './education-cont.component.html',
  styleUrls: ['./education-cont.component.css']
})
export class EducationContComponent implements OnChanges {

  @Input()
  dni_actual!:number;
  constructor(private miTitulos:InyectorDataService) { }
  ngOnChanges(changes: SimpleChanges): void {

    console.log("educacion dice : "+changes.dni_actual.currentValue);
  }

  admin():boolean{
    return false;
  }


  ngOnInit(): void {
    console.log("educacion dice: "+this.dni_actual);
  }
  educacionLista:EducationInterface[]=[];
  eduListDTO:EducacionDTO[]=[];
  titulo:String="Educación Alcanzada";

}
