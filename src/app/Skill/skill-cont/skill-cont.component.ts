import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-cont',
  templateUrl: './skill-cont.component.html',
  styleUrls: ['./skill-cont.component.css']
})
export class SkillContComponent implements OnInit {

  progres:number[]=[20,35,100]
  constructor() { }

  ngOnInit(): void {
  }
  titulo:String="Soft Skill";
}
