import { EducacionDTO } from "../Class/education-class";
import { ExperienciaDTO } from "../Class/experency-class";
import { ProyectoDTO } from "../Class/proyect-class";
import { EducationInterface } from "./education-interface";
import { ExperencyInterface } from "./experency-interface";
import { ProyectInterface } from "./proyect-interface";

export interface PerfilInterface {
  nombre: String;
  apellido: String;
  profesionalPerfil: String;
  descripionPerfil: String | null;
  educacion: EducationInterface[];
  experiencia: ExperencyInterface[];
  proyectos: ProyectInterface[];
}

export interface PerfilDTOInterface {


    id: number | null;
    nombre: String;
    apellido: String;
    dni: number;
    fechaNacimiento: Date | null;
    nacionalidad: String;
    email: String;
    descripcion: String | null;
    profesionalPerfil: String | null;
    image_background_header: String[] | null;
    image_perfil: String[] | null;
    experiencia: ExperienciaDTO[] | null;
    educacion: EducacionDTO[] | null;
    proyectos: ProyectoDTO[] | null;

}
