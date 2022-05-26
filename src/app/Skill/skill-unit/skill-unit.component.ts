import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill, SkillTemplateForm } from 'src/app/Class/skill';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-skill-unit',
  templateUrl: './skill-unit.component.html',
  styleUrls: ['./skill-unit.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SkillUnitComponent implements OnInit,AfterContentInit {

  @Input()
  progres!:number;
  @Input()
  label!:string;
  @Input()
  SkillDTO!:Skill;
  @Output() outSignal: EventEmitter<number> = new EventEmitter<number>();

  //label!:string;
  over180:boolean=false;
  progresUnder:number=0;
  progresOver:number=0;
  color:number=0;
  //
  //SkillDTO!:Skill;
  saveSkillForm!:FormGroup;
  saveSkillFormLabes:ControlModel<String>[]=SkillTemplateForm;
  butonId: String='';
  errorMsg!: String;
  isAdmin!:boolean;
  //
  constructor(
    private refEl:ElementRef,
    private miApi:InyectorDataService,
    private miFromServic:ControlService,
    private miAuth:TokenService,
    private cd:ChangeDetectorRef,
    private toast:ToastService,

    ) { }
  ngAfterContentInit(): void {
    this.cambiarGrados();
  }
  cambiarGrados(){
    this.progresUnder=map(this.progres,0,100,0,360);
    if (this.progres<=33) {
      this.refEl.nativeElement.style.setProperty('--progress-color','red');
    }
    else if (this.progres<=66 && this.progres>33) {
      this.refEl.nativeElement.style.setProperty('--progress-color','yellow');
    }
    else if (this.progres<=100 && this.progres>66) {
      this.refEl.nativeElement.style.setProperty('--progress-color','#42e74f');
    }
    // console.log('in : '+this.progres+' -> : '+this.progresUnder);
    if (this.progres>50) {
      this.over180=true;
      this.progresOver=this.progresUnder-180;
      this.refEl.nativeElement.style.setProperty('--rotacion-grados',180+'deg');
      this.refEl.nativeElement.style.setProperty('--rotacion-grados-over180',this.progresOver+'deg');
    }
    else{
      this.over180=false;
      this.refEl.nativeElement.style.setProperty('--rotacion-grados', this.progresUnder+'deg');
    }
  }
  ngOnInit(): void {
    // console.log('DTO: '+this.SkillDTO)
    //   console.log('progres :'+this.progres)
    //   console.log('label: '+this.label)
    //   console.log('buton id: '+this.butonId);
    if (this.progres==null && this.label==null && this.SkillDTO!=null) {

      this.progres=this.SkillDTO.value;
      this.label=this.SkillDTO.skill;
    }
    this.saveSkillForm = this.miFromServic.toFromGroup(this.saveSkillFormLabes);
    this.saveSkillForm.setValue(this.SkillDTO);
    this.isAdmin=this.miAuth.isAdmin();
    if (!this.miAuth.isAdmin()) //no se puede editar si no es admin
    {
      this.saveSkillForm.disable()
    }
    this.butonId = this.butonId.concat(this.SkillDTO.id?.toString() || '1');
  }
//
deshacer():void{
  this.saveSkillForm = this.miFromServic.toFromGroup(this.saveSkillFormLabes);
  this.saveSkillForm.setValue(this.SkillDTO);
}
get isValid():boolean{
  return this.saveSkillForm.valid;
}
editar(): void {
  if (this.miAuth.isAdmin()) {
    this.miApi.editarSkill(<Skill>this.saveSkillForm.getRawValue())
      .subscribe(
        d => {
          this.SkillDTO = d;
          //console.log("actualizado :", d.id);
        },
        e => {
          this.errorMsg = e
          this.toast.danger('Error :' + e);
        },
        () => {
          this.toast.succes('Se edito correctamente: ' + this.SkillDTO.skill);
          this.saveSkillForm = this.miFromServic.toFromGroup(this.saveSkillFormLabes);
          this.saveSkillForm.setValue(this.SkillDTO);
          this.progres=this.SkillDTO.value;
          this.label=this.SkillDTO.skill;
          this.cd.markForCheck();
          this.ngAfterContentInit();
        }
      )
  }
}

borrar(): void {
  let data: Skill;
  if (this.miAuth.isAdmin()) {
    this.miApi.borrarSkill(this.SkillDTO.id || -1)
      .subscribe(
        d => {
          this.saveSkillForm.reset();
          data = d
          this.toast.danger('Se borro correctamente: ' + data.skill);
          // this.cd.markForCheck();
        },
        e => {
          this.errorMsg = e
          this.toast.danger('Error :' + e);
        },
        () => {
          this.outSignal.emit(data.id || -1) // se emitio un peticion al servidor
          this.cd.markForCheck();
        }
      )
  }
}
}
///
export function clamp(input: number, min: number, max: number): number {
  return input < min ? min : input > max ? max : input;
}

export function map(current: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
  const mapped: number = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return clamp(mapped, out_min, out_max);
}
