import { ControlModel, EntradaTexto, LabelForm, NullFieldForm, restriccion } from "../formulario/control-model";
import { ProyectoDTOInterface } from "../Interface/proyect-interface";


export class ProyectoDTO implements ProyectoDTOInterface{
  id!: number | null;
  nombre!: String;
  lenguaje!: String;
  descripcion!: String;
  image!: String;

}

export const ProyectFromTemplate:ControlModel<String>[] =[
    new NullFieldForm({
      key:'id',
    }),
    new EntradaTexto({
      key:'nombre',
      label:'Nombre',
      order:1,
      required:true,
      restricciones:[
        {restriccion: restriccion.required,valor:'',errores:''},
        {restriccion:restriccion.minlength,valor:'6',errores:'debe ingresar mas de 6 letras!!'}
      ],
    }),
    new EntradaTexto({
      key:'lenguaje',
      label:'Nombre del lenguaje utilizado',
      order:2,
      required:true,
      restricciones:[
        {restriccion: restriccion.required,valor:'',errores:''},
        {restriccion:restriccion.minlength,valor:'6',errores:'debe ingresar mas de 6 letras!!'}
      ],
    }),
    new EntradaTexto({
      key:'descripcion',
      label:'Descripcion brebe del proyecto',
      order:3,
      required:true,
      restricciones:[
        {restriccion: restriccion.required,valor:'',errores:''},
        {restriccion:restriccion.minlength,valor:'6',errores:'debe ingresar mas de 6 letras!!'}
      ],
    }),
    new EntradaTexto({
      key:'image',
      label:'Fotos del proyecto',
      order:4,
      required:true,
      restricciones:[
        {restriccion: restriccion.required,valor:'',errores:''},
        {restriccion:restriccion.minlength,valor:'6',errores:'debe ingresar mas de 6 letras!!'}
      ],
    }),

]

