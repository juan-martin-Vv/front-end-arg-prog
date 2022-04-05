export interface ProyectInterface {
  nombre:String;
  objetivo:String;
  lenguaje:String;
  descripcion:String|null;
}
export interface ProyectoDTOInterface{
  id:number|null;
  nombre:String;
  lenguaje:String;
  descripcion:String;
  image:String;
}
