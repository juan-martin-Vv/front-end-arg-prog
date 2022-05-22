import { ChangeDetectionStrategy, ChangeDetectorRef, Component,EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigComponent } from 'src/app/About/config/config.component';
import { Login2Component } from 'src/app/login2/login2.component';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MainComponent implements  OnInit{
  dni_actual!:number;
  dni:number=0;
  @Output() dniEmiter: EventEmitter<number> =   new EventEmitter();
  is_admin!:boolean;
  @Output() adminEmiter: EventEmitter<boolean> = new EventEmitter();


  constructor(
    private miServicio : InyectorDataService,
    private miAuth:TokenService,
    private router: Router,
    private modalService: NgbModal,
    private ruta: ActivatedRoute,
    private cd:ChangeDetectorRef
  ) {

   }
  ngOnInit(): void {
    this.ruta.queryParams.subscribe(
      d=>{
        if (d['login']=='on') {
          console.log('login on?');
          this.router.navigateByUrl('/');
          this.modalService.open(Login2Component);
        }
        if (d['reload']=='on') {
          console.log('reload on');
          this.router.navigateByUrl('/');
          // this.dni_actual=0;
          // this.dni_actual=this.dni;
          this.loadPerfirl()
        }
        if(d['login']=='off'){
          console.log('login off');
          this.miAuth.logout()
          // this.dni_actual=0;
          // this.is_admin=false;
          this.router.navigateByUrl('/?login=on');
        }
        if(d['login']=='out'){
          console.log('login out');
          this.miAuth.logout()
          // this.dni_actual=0;
          // this.is_admin=false;
          this.loadPerfirl();//refresco general
          this.router.navigateByUrl('/');
        }
        if(d['about']=='on'){
          // console.log('login on?');
          this.router.navigateByUrl('/');
          this.modalService.open(ConfigComponent);
        }
      }
    )
    this.loadPerfirl()
  }
  private loadPerfirl(){
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
        this.miServicio.public_dni(this.dni_actual);    //emitimos dni a los otros servicios
        // console.log("main dice dni a cargar: "+this.dni_actual);
        this.is_admin=this.miAuth.isAdmin();
        this.cd.markForCheck()
      }
    );
  }
}
