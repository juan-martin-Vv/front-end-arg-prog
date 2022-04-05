import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ExperencyClass, ExperienciaDTO } from 'src/app/Class/experency-class';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';

@Component({
  selector: 'app-experency-cont',
  templateUrl: './experency-cont.component.html',
  styleUrls: ['./experency-cont.component.css']
})
export class ExperencyContComponent implements OnInit, OnChanges {

  @Input() dni_actual!: number;
  errorMsg!:string;
  constructor(private miExperServ: InyectorDataService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("experiencia dice : " + changes.dni_actual.currentValue);
    if (this.dni_actual != null&&this.dni_actual!=0)
    {
      this.miExperServ.cargarExperiencia(this.dni_actual).subscribe(
        d => { this.expDto = d },
        e => {
          this.errorMsg=e
         },
        () => {
          console.log("experiencia dice :" + this.dni_actual);
        }
      );
    }
  }

  ngOnInit(): void {


  }
  miExperiencia: ExperencyClass[] = [];
  expDto: ExperienciaDTO[] = [];
  titulo: String = "Experiencia Laboral";
}
