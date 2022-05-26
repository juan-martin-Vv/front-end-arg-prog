import { ControlModel, EntradaFechas, EntradaTexto, ImagenForm, NullFieldForm, restriccion } from "../formulario/control-model";


 export class EducacionDTO {
   id!: number | null;
   institucion!: String;
   titulo!: String;
   image!: String | null;
   carrera!: string | null;
   inicio!: String;
   fin!: String | null;
 }

 export const EducacionFormTemplate:ControlModel<String>[] =[
   new NullFieldForm({
     key:'id'
   }),
   new EntradaTexto({
     key:'institucion',
     label:'Institucion educativa :',
     required:true,
     restricciones:[
      {restriccion:restriccion.required}
     ],
     order:2
   }),
   new EntradaTexto({
     key:'titulo',
     label:'Titulo obtenido/pretendido :',
     required:true,
     restricciones:[
      {restriccion:restriccion.required}
     ],
     order:1
   }),
   new ImagenForm({
     key:'image',
     label:'Logo o Imagen:',
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
