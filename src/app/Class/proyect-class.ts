import { ControlModel, EntradaTexto, ImagenForm, NullFieldForm, restriccion } from "../formulario/control-model";

export class ProyectoDTO {
  id!: number | null;
  nombre!: String;
  lenguaje!: String;
  descripcion!: String;
  image!: String;
  linkGit!:String;

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
    new ImagenForm({
      key:'image',
      label:'Foto del proyecto',
      order:4,
      required:true,
      restricciones:[
        {restriccion: restriccion.required,valor:'',errores:''},
        {restriccion: restriccion.minlength,valor:'6',errores:'debe ingresar mas de 6 letras!!'}
      ],
    }),
    new EntradaTexto({
      key:'linkGit',
      label:'Repositorio GitHub :',
      restricciones:[
        {restriccion:restriccion.required}
      ]
    })

]

