import { EducationInterface } from "../Interface/education-interface";
import { ExperencyInterface } from "../Interface/experency-interface";
import { PerfilDTOInterface, PerfilInterface } from "../Interface/perfil-interface";
import { ProyectInterface} from "../Interface/proyect-interface";
import { EducacionDTO } from "./education-class";
import { ExperienciaDTO } from "./experency-class";
import { ProyectoDTO } from "./proyect-class";


export class PerfilClass implements PerfilInterface{
  descripionPerfil!: String | null;
  nombre!: String;
  apellido!: String;
  profesionalPerfil!: String;
  educacion!: EducationInterface[];
  experiencia!: ExperencyInterface[];
  proyectos!: ProyectInterface[];

 }

export class PerfilDTO implements PerfilDTOInterface{
  id!: number | null;
  nombre!: String;
  apellido!: String;
  dni!: number;
  fechaNacimiento!: Date | null;
  nacionalidad!: String;
  email!: String;
  descripcion!: String | null;
  image_background_header!: String | null;
  image_perfil!: String | null;
  experiencia!: ExperienciaDTO[] | null;
  educacion!: EducacionDTO[] | null;
  proyectos!: ProyectoDTO[] | null;

  constructor(){
    this.nombre="nono";
    this.apellido="nono";
    this.nacionalidad="nono";
    this.email="";
  }
}
