import { EntradaTexto, NullFieldForm, restriccion } from "../formulario/control-model";

export class Skill {
  id!:number;
  skill!:string;
  value!:number;
}
export const SkillTemplateForm=[
  new NullFieldForm({
    key:'id'
  }),
  new EntradaTexto({
    key:'skill',
    label:'Tipo de Skill',
    required:true,
    restricciones:[
      {restriccion:restriccion.required},
      {restriccion:restriccion.minlength,valor:'4'},
      {restriccion:restriccion.maxlength,valor:'15',errores:'no mas de 15 chart'}
    ]
  }),
  new EntradaTexto({
    key:'value',
    label:'Valor',
    type:'number',
    required:true,
    restricciones:[
      {restriccion:restriccion.required},
      {restriccion:restriccion.min,valor:'0',errores:'solo valores positivos'},
      {restriccion:restriccion.max,valor:'100',errores:'no mayor de 100'}
    ]
  })
]

