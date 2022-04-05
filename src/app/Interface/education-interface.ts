export interface EducationInterface {
  titulo:String;
  fechaObtencion:Date;
  completado:boolean;
  emisorTitulo:String;
  descripcion:String|null;
}
export interface EducacionDTOInterface{
  id:number|null;
  institucion:String;
  titulo:String;
  image:String|null;
  carrera:string|null;
  inicio:Date;
  fin:Date|null;
}
