import { Injectable } from '@angular/core';
import { PerfilClass, PerfilDTO } from '../Class/perfil-class';
import { PerfilInterface } from '../Interface/perfil-interface';
import {HttpClient} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { EducacionDTO } from '../Class/education-class';
import { ExperienciaDTO } from '../Class/experency-class';
import { ProyectoDTO } from '../Class/proyect-class';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConectorRestService {


  //server='http://192.168.100.65:8080/'
  server:String=environment.URL_API;
  perfil_uri:String=this.server.concat('perfil');
  experiencia_uri:String=this.server.concat('experience');
  proyectos_uri:String=this.server.concat('proyect');
  educacion_uri:String=this.server.concat('education');
  //
  constructor( private http :HttpClient ) { }

  getPerfil(dni?:number):Observable<PerfilDTO>{
    let server_url;
    if (dni!=null) {
      server_url=this.server+`perfil?dni=${dni}`;
    }
    else{
      server_url=this.server+'perfil';
    }
    return <Observable<PerfilDTO>>this.getRequest(server_url);
  }
  getEducation(dni?:number):Observable<EducacionDTO[]>{
    let server_url;
    if (dni!=null) {
      server_url=this.server+`education?dni=${dni}`;
    }
    else{
      server_url=this.server+`education`;
    }
    return <Observable<EducacionDTO[]>>this.getRequest(server_url);
  }
  getExperence(dni?:number):Observable<ExperienciaDTO[]>{
    let server_url;
    if (dni!=null) {
      server_url=this.server+`experience?dni=${dni}`;
    }
    else{
      server_url=this.server+'experience';
    }
    return <Observable<ExperienciaDTO[]>>this.getRequest(server_url);
  }
  getProyect(dni?:number):Observable<ProyectoDTO[]>{
    let server_url;
    if (dni!=null) {
      server_url=this.server+`proyect?dni=${dni}`;
    }
    else{
      server_url=this.server+`proyect`;
    }
    return <Observable<ProyectoDTO[]>>this.getRequest(server_url);
  }
  // peticiones GET
  public getRequest(get_link:String):Observable<any>{
    return  this.http.get<any>(get_link.toString()).pipe(catchError(
          (e)=>{
            console.log('error en el api: '+e)
            return throwError(e.error);
          },
        ));
  }
  // peticiones POST
  public postRequest(get_link:String, body:any):Observable<any>{
    return  this.http.post<any>(get_link.toString(),body)
    .pipe(catchError(
          (e)=>{
            console.log('error en el api: '+e.error)
            return throwError(e.error);
          },
        ));
  }
  // peticiones PUT
  public putRequest(get_link:String, body:any):Observable<any>{
    return  this.http.put<any>(get_link.toString(),body).pipe(catchError(
          (e)=>{
            console.log('error en el interceptor: '+e)
            return throwError(e.error);
          },
        ));
  }
  // peticiones DELETE
  public deleteRequest(get_link:String):Observable<any>{
    return  this.http.delete<any>(get_link.toString()).pipe(catchError(
          (e)=>{
            console.log('error en el interceptor: '+e)
            return throwError(e.error);
          },
        ));
  }
  //
  deletePerfil(dni: number | undefined): Observable<PerfilDTO> {
    return <Observable<PerfilDTO>>this.deleteRequest(this.perfil_uri.concat(`?dni=${dni}`));
  }
  deleteProyect(id: number | undefined): Observable<ProyectoDTO> {
    return <Observable<ProyectoDTO>>this.deleteRequest(this.proyectos_uri.concat(`?id=${id}`));
  }
  deleteExperence(id: number | undefined): Observable<ExperienciaDTO> {
    return <Observable<ExperienciaDTO>>this.deleteRequest(this.experiencia_uri.concat(`?id=${id}`));
  }
  deleteEducation(id: number | undefined): Observable<EducacionDTO> {
    return <Observable<EducacionDTO>>this.deleteRequest(this.educacion_uri.concat(`?id=${id}`));
  }
  putPerfil(dto:PerfilDTO): Observable<PerfilDTO> {
    return <Observable<PerfilDTO>>this.putRequest(this.perfil_uri,dto);
  }
  putProyect(dto:ProyectoDTO): Observable<ProyectoDTO> {
    return <Observable<ProyectoDTO>>this.putRequest(this.proyectos_uri,dto);
  }
  putExperence(dto:ExperienciaDTO): Observable<ExperienciaDTO> {
    return <Observable<ExperienciaDTO>>this.putRequest(this.experiencia_uri,dto);
  }
  putEducation(dto:EducacionDTO): Observable<EducacionDTO> {
    return <Observable<EducacionDTO>>this.putRequest(this.educacion_uri,dto);
  }
  postPerfil(dni: number | undefined, dto:PerfilDTO): Observable<PerfilDTO> {
    return <Observable<PerfilDTO>>this.postRequest(this.perfil_uri.concat(`?dni=${dni}`),dto);
  }
  postProyect(dni: number | undefined, dto:ProyectoDTO): Observable<ProyectoDTO> {
    return <Observable<ProyectoDTO>>this.postRequest(this.proyectos_uri.concat(`?dni=${dni}`),dto);
  }
  postExperence(dni: number | undefined, dto:ExperienciaDTO): Observable<ExperienciaDTO> {
    return <Observable<ExperienciaDTO>>this.postRequest(this.experiencia_uri.concat(`?dni=${dni}`),dto);
  }
  postEducation(dni: number | undefined,dto:EducacionDTO): Observable<EducacionDTO> {
    return <Observable<EducacionDTO>>this.postRequest(this.educacion_uri.concat(`?dni=${dni}`),dto);
  }
}

