import { Component, Input, OnInit } from '@angular/core';
import { ExperencyClass, ExperienciaDTO } from 'src/app/Class/experency-class';


@Component({
  selector: 'app-experency-unit',
  templateUrl: './experency-unit.component.html',
  styleUrls: ['./experency-unit.component.css']
})
export class ExperencyUnitComponent implements OnInit {
  // @Input()
  // experList!:ExperencyClass;

  @Input()
  expDto!:ExperienciaDTO;
  constructor() { }

  ngOnInit(): void {
  }

}
