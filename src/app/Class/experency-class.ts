import { ExperencyInterface, ExperienciaDTOInterface } from "../Interface/experency-interface";


export class ExperencyClass implements ExperencyInterface
{
  constructor(pue?:String,iniFech?:Date,finalFech?:Date,enti?:String,desc?:String){
    this.puesto=pue??"zzzz";
    this.fechaInicio=iniFech??new Date('1/1/01');
    this.fechaFinalizacion=finalFech?? new Date('1/1/99');
    this.entidad=enti??"te la debo";
    this.descripcion=desc??"---->";
  }
  puesto!: String;
  fechaInicio!: Date;
  fechaFinalizacion!: Date | null;
  entidad!: String;
  descripcion!: String | null;

}
export class ExperienciaDTO implements ExperienciaDTOInterface{
  id!: number | null;
  institucion!: String;
  puesto!: String;
  descripcion!: String;
  image!: String | null;
  inicio!: Date | null;
  fin!: Date | null;

}
