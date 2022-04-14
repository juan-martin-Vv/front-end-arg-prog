import { EntradaFechas, EntradaTexto, NullFieldForm, restriccion } from "../formulario/control-model";
import { EducationInterface } from "../Interface/education-interface";
import { ExperencyInterface } from "../Interface/experency-interface";
import { PerfilDTOInterface, PerfilInterface } from "../Interface/perfil-interface";
import { ProyectInterface} from "../Interface/proyect-interface";
import { EducacionDTO } from "./education-class";
import { ExperienciaDTO } from "./experency-class";
import { ProyectoDTO } from "./proyect-class";


export class PerfilDTO {
  id!: number | null;
  nombre!: String;
  apellido!: String;
  dni!: number;
  fechaNacimiento!: Date | null;
  nacionalidad!: String;
  email!: String;
  descripcion!: String | null;
  profesionalPerfil!: String |null;
  image_background_header!: String[] | null;
  image_perfil!: String[] | null;
  experiencia!: ExperienciaDTO[] | null;
  educacion!: EducacionDTO[] | null;
  proyectos!: ProyectoDTO[] | null;

  constructor(){

  this.id=0;
  this.nombre='';
  this.apellido='';
  this.dni=0;
  this.fechaNacimiento=new Date()
  this.nacionalidad='';
  this.email='';
  this.descripcion='';
  this.profesionalPerfil='';
  this.image_background_header=[];
  this.image_perfil=[];
  this.experiencia=[];
  this.educacion=[];
  this.proyectos=[];
  }
}
export const PerfilFromTemplate =[
  new NullFieldForm({
    key:'id',
    order:1
  }),
  new EntradaTexto({
    key:'nombre',
    label:'Nombre :'
  }),
  new EntradaTexto({
    key:'apellido',
    label:'Apellido :'
  }),
  new EntradaTexto({
    key:'dni',
    label:'DNI :',
    type:'number'
  }),
  new EntradaFechas({
    key:'fechaNacimiento',
    label:'Fecha de nacimiento :'
  }),
  new EntradaTexto({
    key:'nacionalidad',
    label:'Nacionalidad :'
  }),
  new EntradaTexto({
    key:'email',
    label:"Email :",
    type:"email",
    required:true,
    restricciones:[
      {restriccion:restriccion.required,errores:"email es requerido!!!"},
      {restriccion:restriccion.email,valor:"mail@mail.com",errores:"ingrese un email valido"}
    ]
  }),
  new EntradaTexto({
    key:'descripcion',
    label:'Descripcion :'
  }),
  new EntradaTexto({
    key:'profesionalPerfil',
    label:'Perfil profesional :'
  }),
  ///********campos de arrays**********///
  new NullFieldForm({
    key:'image_background_header'
  }),
  new NullFieldForm({
    key:'image_perfil'
  }),
  ///********campos con edicion propia**********///
  new NullFieldForm({
    key:'experiencia'
  }),
  new NullFieldForm({
    key:'educacion'
  }),
  new NullFieldForm({
    key:'proyectos'
  })
]
