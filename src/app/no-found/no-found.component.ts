import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-found',
  template: `
  <div class="d-flex justify-content-center align-items-center vh-100 bg-dark bg-opacity-75 p-0 m-0">
    <div class="text text-center bg-dark text-white p-4">
      <h3>Error pagina no encontrada</h3>
      <h3>o</h3>
      <h3>Servidor Caido</h3>
      <h3>Intentolo mas tarde</h3>
      <h1>U_u</h1>
      <button class="btn btn-success" (click)="goHome()">Volver</button>
    </div>
  </div>
  `,
  styleUrls: ['./no-found.component.css']
})
export class NoFoundComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goHome(){
    this.router.navigate(['/']);
  }
}
