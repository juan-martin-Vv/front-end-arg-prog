import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AboutClass } from '../Class/about-class';
import { EducacionDTO, EducationClass } from '../Class/education-class'
import { ExperienciaDTO } from '../Class/experency-class';
import { PerfilDTO } from '../Class/perfil-class';
import { ProyectoDTO } from '../Class/proyect-class';
import { Skill } from '../Class/skill';
import { ConectorRestService } from './conector-rest.service';

let per: PerfilDTO = new PerfilDTO();
@Injectable({
  providedIn: 'root'
})
export class InyectorDataService {

  ////     dni que pasara a todos componentes que lo requieran
  private dni = new BehaviorSubject<number>(0);
  dni_actual= this.dni.asObservable();
  //

  constructor(private miConexion: ConectorRestService) {
  }
  //
  public public_dni(dni:number){
    this.dni.next(dni);
  }

  //////// carga por default
  cargarSkills(dni: number): Observable<Skill[]> {
    return this.miConexion.getSkill(dni);
  }
  cargarEducacion(dni?: number): Observable<EducacionDTO[]> {
    return this.miConexion.getEducation(dni);
  }
  cargarExperiencia(dni?: number): Observable<ExperienciaDTO[]> {
    return this.miConexion.getExperence(dni);
  }
  cargarProyectos(dni?: number): Observable<ProyectoDTO[]> {
    return this.miConexion.getProyect(dni);
  }
  cargarPerfil(dni?: number): Observable<PerfilDTO> {
    if (dni != null) {
      return this.miConexion.getPerfil(dni);
    } else {
      return this.miConexion.getPerfil();
    }
  }
  ///// Guardar datos
  guardarSkill(dni: number | undefined, dto:Skill): Observable<Skill> {
    return this.miConexion.postSkill(dni,dto);
  }
  guardarEducacion(dni: number | undefined, dto:EducacionDTO): Observable<EducacionDTO> {
    return this.miConexion.postEducation(dni,dto);
  }
  guardarExperiencia(dni: number, dto:ExperienciaDTO): Observable<ExperienciaDTO> {
    return this.miConexion.postExperence(dni,dto);
  }
  guardarProyectos(dni: number,dto:ProyectoDTO): Observable<ProyectoDTO> {
    return this.miConexion.postProyect(dni,dto);
  }
  guardarPerfil(dni: number,dto:PerfilDTO): Observable<PerfilDTO> {
    return this.miConexion.postPerfil(dni,dto);
  }

  //// editar
  editarSkill(dto:Skill): Observable<Skill> {
    return this.miConexion.putSkill(dto);
  }
  editarEducacion(dto:EducacionDTO): Observable<EducacionDTO> {
    return this.miConexion.putEducation(dto);
  }
  editarExperiencia(dto:ExperienciaDTO): Observable<ExperienciaDTO> {
    return this.miConexion.putExperence(dto);
  }
  editarProyectos(dto: ProyectoDTO): Observable<ProyectoDTO> {
    return this.miConexion.putProyect(dto);
  }
  editarrPerfil(dto:PerfilDTO): Observable<PerfilDTO> {
    return this.miConexion.putPerfil(dto);
  }
  //// borrar
  borrarSkill(id?: number): Observable<Skill> {
    return this.miConexion.deleteSkill(id);
  }
  borrarEducacion(id?: number): Observable<EducacionDTO> {
    return this.miConexion.deleteEducation(id);
  }
  borrarExperiencia(id?: number): Observable<ExperienciaDTO> {
    return this.miConexion.deleteExperence(id);
  }
  borrarProyectos(id?: number): Observable<ProyectoDTO> {
    return this.miConexion.deleteProyect(id);
  }
  borrarPerfil(dni?: number): Observable<PerfilDTO> {
    return this.miConexion.deletePerfil(dni);
  }
}
