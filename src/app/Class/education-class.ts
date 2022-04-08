import { Inject } from "@angular/core";
import { ControlModel, EntradaFechas, EntradaTexto, NullFieldForm } from "../formulario/control-model";
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

 export const EducacionFormTemplate:ControlModel<String>[] =[
   new NullFieldForm({
     key:'id'
   }),
   new EntradaTexto({
     key:'institucion',
     label:'Institucion educativa :',
     required:true,
     order:2
   }),
   new EntradaTexto({
     key:'titulo',
     label:'Titulo obtenido/pretendido :',
     required:true,
     order:1
   }),
   new EntradaTexto({
     key:'image',
     label:'Logo :',
     order:3
   }),
   new EntradaTexto({
     key:'carrera',
     label:'Carrera o especialidad :'
   }),
   new EntradaFechas({
     key:'inicio',
     label:'Fecha de inicio',
   }),
   new EntradaFechas({
     key:'fin',
     label:'Fecha de finalizacion'
   })
 ]
