import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConectorRestService } from './Service/conector-rest.service';
import { DashboardServService } from './Service/dashboard-serv.service';
import { InyectorDataService } from './Service/inyector-data.service';
import { AboutComponent } from './About/about/about.component';
import { EducationContComponent } from './Education/education-cont/education-cont.component';
import { EducationUnitComponent } from './Education/education-unit/education-unit.component';
import { ExperencyContComponent } from './Experency/experency-cont/experency-cont.component';
import { ExperencyUnitComponent } from './Experency/experency-unit/experency-unit.component';
import { HeaderBarComponent } from './Header/header-bar/header-bar.component';
import { HeaderComponent } from './Header/header/header.component';
import { LoginComponent } from './Login/login/login.component';
import { MainComponent } from './Main/main/main.component';
import { ProyectContComponent } from './Proyect/proyect-cont/proyect-cont.component';
import { ProyectUnitComponent } from './Proyect/proyect-unit/proyect-unit.component';
import { SkillContComponent } from './Skill/skill-cont/skill-cont.component';
import { SkillUnitComponent } from './Skill/skill-unit/skill-unit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Login/dashboard/dashboard.component';
import { interceptorProvider } from './Service/Interceptor/interceptor.service';
import { FormularioModule } from './formulario/formulario.module';
import { ErrorHandlerProvider } from './Service/Interceptor/golbal-error-handler.service';
import 'zone.js/dist/zone.api.extensions';
import { Login2Component } from './login2/login2.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { ToastModule } from './toast/toast.module';
import { ConfigComponent } from './About/config/config.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    HeaderComponent,
    AboutComponent,
    ExperencyContComponent,
    ExperencyUnitComponent,
    EducationContComponent,
    EducationUnitComponent,
    SkillContComponent,
    SkillUnitComponent,
    ProyectContComponent,
    ProyectUnitComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    Login2Component,
    NoFoundComponent,
    ConfigComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormularioModule,
    NgbModule

  ],
  providers: [
    ConectorRestService,
    DashboardServService,
    InyectorDataService,
    interceptorProvider,
    ErrorHandlerProvider,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
