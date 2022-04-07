import { ControlModel, EntradaFechas, EntradaTexto, NullFieldForm, restriccion } from "../formulario/control-model";
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
export const ExperiencaFromTemplate:ControlModel<String>[] =[
  new NullFieldForm({
    key:'id',
  }),
  new EntradaTexto(
    {
      key:'institucion',
      label:'Lugar de trabajo :',
      required:true,
      order:1,
      restricciones:[
        {restriccion:restriccion.required},
        {restriccion:restriccion.minlength,valor:'4',errores:'mas de cuatro letras!!'}
      ]
    }),
    new EntradaTexto({
      key:'puesto',
      label:'Puesto que se ocupo :',
      required:false,
      order:2
    }),
    new EntradaTexto({
      key:'descripcion',
      label:'Descripcion de la labor :',
      required:false,
      order:3
    }),
    new EntradaTexto({
      key:'image',
      label:'Imagen :'
    }),
    new EntradaFechas({
      key:'inicio',
      label:'Fecha de inicio :'
    }),
    new EntradaFechas({
      key:'fin',
      label:'Finalizacion :'
    })
  ]
