import { ControlModel, EntradaFechas, EntradaTexto, ImagenForm, NullFieldForm, restriccion } from "../formulario/control-model";

export class ExperienciaDTO {
  id!: number | null;
  institucion!: String;
  puesto!: String;
  descripcion!: String;
  image!: String | null;
  inicio!: String | null;
  fin!: String | null;

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
      required:true,
      restricciones:[
        {restriccion:restriccion.required}
      ],
      order:2
    }),
    new EntradaTexto({
      key:'descripcion',
      label:'Descripcion de la labor :',
      required:false,
      order:3
    }),
    new ImagenForm({
      key:'image',
      label:'Logo o Imagen:'
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
