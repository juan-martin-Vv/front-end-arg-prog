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
    label:'Tipo de Skill'
  }),
  new EntradaTexto({
    key:'value',
    label:'Valor',
    type:'number',
    required:true,
    restricciones:[
      {restriccion:restriccion.min,valor:'0',errores:'solo valores positivos'},
      {restriccion:restriccion.max,valor:'100',errores:'no mayor de 100'}
    ]
  })
]

