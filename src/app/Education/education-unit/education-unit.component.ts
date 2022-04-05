import { Component, Input, OnInit } from '@angular/core';
import { EducacionDTO } from 'src/app/Class/education-class';
import { EducationInterface } from 'src/app/Interface/education-interface';

@Component({
  selector: 'app-education-unit',
  templateUrl: './education-unit.component.html',
  styleUrls: ['./education-unit.component.css']
})
export class EducationUnitComponent implements OnInit {

 /* @Input()
  educacionLista!: EducationInterface;*/
  @Input()
  eduListDTO!:EducacionDTO;
  constructor() { }


  ngOnInit(): void {
  }

}
