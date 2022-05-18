import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { LoginComponent } from './Login/login/login.component';
import { Login2Component } from './login2/login2.component';
import { MainComponent } from './Main/main/main.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { WardService as Guarda } from './Service/Ward/ward.service';
const routes: Routes = [
  {path:"",component: MainComponent},
  {path:"erro",component:NoFoundComponent},
  {path:'**',redirectTo:'/erro'},
  {path:"dashboard",component: DashboardComponent,canActivate:[Guarda],data:{expectedRol:["ADMIN"]}}
  //{pathMatch:'headar',component: HeaderBarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
