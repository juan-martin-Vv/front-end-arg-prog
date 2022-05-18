
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill, SkillTemplateForm } from 'src/app/Class/skill';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-skill-cont',
  templateUrl: './skill-cont.component.html',
  styleUrls: ['./skill-cont.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class SkillContComponent implements OnInit {

  dni_actual!:number;
  //
  admin!:boolean;
  //
  //
  saveSkillForm!:FormGroup;
  saveSkillFormLabes:ControlModel<String>[]=SkillTemplateForm;
  //
  chilSing!:boolean;
  constructor(
    private miApi:InyectorDataService,
    private miFromServic:ControlService,
    private tokenService:TokenService,
    private cd:ChangeDetectorRef,
    private toast:ToastService,
    private router:Router
    ) { }
  private getData():void{
    if(this.dni_actual!=null&&this.dni_actual!=0)
    this.miApi.cargarSkills(this.dni_actual).subscribe(
      d=>{
        this.skillDto=d;
      },
      e=>{
        this.toast.show('Error :'+e)
      },
      ()=>{
        //this.admin=this.tokenService.isAdmin();
        this.cd.markForCheck()
      }
    );
  }
  iniciaForm(){
    this.saveSkillForm.reset();
  }
  signal(inSingal: number):void{
    let array:Skill[]=[];
    // console.log('signal :'+inSingal)
    this.skillDto.forEach( d=>{
      if (d.id!=inSingal) {
        array=[...array,d]
      }
    })
    this.getData();
    this.skillDto=array;
    this.cd.markForCheck();
  }

  guardar():void{
    let saveSkill:Skill;
    saveSkill=<Skill>this.saveSkillForm.getRawValue();
    if (this.tokenService.isAdmin()) {
        this.miApi.guardarSkill(this.dni_actual,saveSkill)
        .subscribe(
          d=>{
            this.skillDto.push(d);
            this.toast.succes("Se guardo correctamente :"+d.skill)
          },
          e=>{
            this.toast.danger('Se produjo un error : '+e)
            this.router.navigateByUrl('/')
          },
          ()=>{
            this.saveSkillForm=this.miFromServic.toFromGroup(this.saveSkillFormLabes);
            //this.saveProyectForm.reset();
            this.cd.markForCheck()
          }
        )
    }
  }

  ngOnInit(): void {
    console.log('proyect on!');
    this.miApi.dni_actual.subscribe(d=>{
      this.dni_actual=d;
      this.getData();
    }
      );
    this.tokenService.isAdminObs.subscribe(d=>{
      this.admin=d;
      this.cd.markForCheck();
    })
    this.saveSkillForm=this.miFromServic.toFromGroup(this.saveSkillFormLabes);
    this.getData();
  }
  skillDto:Skill[]=[];
  titulo:String="Habilidades";
}
