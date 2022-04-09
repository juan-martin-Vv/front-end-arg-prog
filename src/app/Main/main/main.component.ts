import { ChangeDetectionStrategy, ChangeDetectorRef, Component,EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login2Component } from 'src/app/login2/login2.component';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  //changeDetection:ChangeDetectionStrategy.Default
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
    private toast:ToastService,
    private cd:ChangeDetectorRef
  ) {

   }

  printDate():void{

    let ms_per_day=1000*60*60*24;
    let creado=1648435844
    let expirado=1648439444
    // 1648439444   //sin millisec
    // 1649199837218
    // 1649199837218
    // 1649200454287
    // 761366212
    let ahora=Date.now()
     console.log(new Date(creado*1000))
  //   console.log(new Date(expirado*1000))
  //   console.log(new Date(ahora))
  // console.log('tiempo en number: '+new Date(Date.now()).valueOf());
  //   if (expirado<ahora) {
  //     console.log('token expirado hacia :')
  //     console.log((ahora-(expirado*1000))/1000*60*60)

  // console.log(new Date(ahora-expirado*1000))
    //}
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
          this.dni_actual=0;
          this.dni_actual=this.dni;
          this.loadPerfirl()
        }
        if(d['login']=='off'){
          console.log('login off');
          this.miAuth.logout()
          this.dni_actual=0;
          this.is_admin=false;
          this.router.navigateByUrl('/?login=on');
        }
      }
    )

    this.printDate()
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
        console.log("main dice dni a cargar: "+this.dni_actual);
        this.is_admin=this.miAuth.isAdmin();
        this.cd.markForCheck()
      }
    );
  }
}
