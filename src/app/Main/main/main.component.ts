import { ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class MainComponent implements  OnInit{
  dni_actual!:number;
  @Output() dniEmiter: EventEmitter<number> =   new EventEmitter();
  is_admin!:boolean;
  @Output() adminEmiter: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private miServicio : InyectorDataService,
    private miAuth:TokenService,
    private router: Router
  ) {

   }
  ngOnInit(): void {
    let dni:number=0;
    this.miServicio.cargarPerfil().subscribe(
      d=>{
        dni=d.dni;

      },
      e=>{
        console.log("main dice error: ");
        console.log(e);
      },
      ()=>{
        this.dni_actual=dni;
        console.log("main dice dni a cargar:"+this.dni_actual);
        this.dniEmiter.emit(this.dni_actual);
        this.is_admin=this.miAuth.isAdmin();
        this.adminEmiter.emit(this.is_admin);
      }
    );

  }


}
