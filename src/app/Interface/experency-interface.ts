export interface ExperencyInterface {
  puesto:String;
  fechaInicio:Date;
  fechaFinalizacion:Date|null;
  entidad:String;
  descripcion:String|null;
}
export interface ExperienciaDTOInterface{
  id:number|null;
  institucion:String;
  puesto:String;
  descripcion:String;
  image:String|null;
  inicio:Date|null;
  fin:Date|null;
}
