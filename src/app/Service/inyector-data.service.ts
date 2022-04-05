import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AboutClass } from '../Class/about-class';
import { EducacionDTO, EducationClass } from '../Class/education-class'
import { ExperienciaDTO } from '../Class/experency-class';
import { PerfilDTO } from '../Class/perfil-class';
import { ProyectoDTO } from '../Class/proyect-class';
import { ConectorRestService } from './conector-rest.service';

let per: PerfilDTO = new PerfilDTO();
@Injectable({
  providedIn: 'root'
})
export class InyectorDataService {


  
  constructor(private miConexion: ConectorRestService) {
  }
  //////// carga por default
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
  borrarEducacion(dni?: number): Observable<EducacionDTO> {
    return this.miConexion.deleteEducation(dni);
  }
  borrarExperiencia(dni?: number): Observable<ExperienciaDTO> {
    return this.miConexion.deleteExperence(dni);
  }
  borrarProyectos(dni?: number): Observable<ProyectoDTO> {
    return this.miConexion.deleteProyect(dni);
  }
  borrarPerfil(dni?: number): Observable<PerfilDTO> {
    return this.miConexion.deletePerfil(dni);
  }
}
