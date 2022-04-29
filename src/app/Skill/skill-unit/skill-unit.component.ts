import { AfterContentInit, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-unit',
  templateUrl: './skill-unit.component.html',
  styleUrls: ['./skill-unit.component.css']
})
export class SkillUnitComponent implements OnInit,AfterContentInit {

  @Input()
  progres:number=25;
  constructor(private refEl:ElementRef) { }
  ngAfterContentInit(): void {
    this.cambiarGrados();
  }
  cambiarGrados(){
    this.refEl.nativeElement.style.setProperty('--rotacion-grados', this.progres+'deg');
  }
  ngOnInit(): void {

  }

}
