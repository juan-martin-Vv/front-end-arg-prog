import { Inject } from "@angular/core";
import { EducacionDTOInterface, EducationInterface } from "../Interface/education-interface";


export class EducationClass implements EducationInterface{

  constructor(titu?:String,fechOb?:Date,@Inject(Boolean) comlp?:boolean ,emi?:String,desc?:String)
  {
    this.titulo=titu??"Panson";
    this.fechaObtencion=fechOb?? new Date();
    this.completado=comlp ?? true;
    this.emisorTitulo=emi??"Cantina de Mou";
    this.descripcion=desc??"Tomar serveza hasta fallecer";
  }
  titulo!: String;
  fechaObtencion!: Date;
  completado!: boolean;
  emisorTitulo!: String;
  descripcion!: String | null;

 }
 export class EducacionDTO implements EducacionDTOInterface{
   id!: number | null;
   institucion!: String;
   titulo!: String;
   image!: String | null;
   carrera!: string | null;
   inicio!: Date;
   fin!: Date | null;

 }
