import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { NO_TOKEN, TokenService } from 'src/app/Service/token.service';
@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  isAdmin!: boolean;
  isLogged!: boolean;
  navbarfixed: boolean = false;
  themeDark: boolean = false;
  constructor(
    private miAuth: TokenService,
    private miApi :InyectorDataService
  ) { }

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 50) {
      this.navbarfixed = true;

    }
    else {
      this.navbarfixed = false;
    }

  }
  ngOnInit(): void {
     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
       // console.log('dark theme detec..');
       localStorage.setItem('dark-theme','present');
        //  this.darkOn();
     }
    this.miApi.dni_actual.subscribe(
      d=>{
        this.Logged()
        // console.log('is logged: '+this.isLogged)
      }
    )
    this.miAuth.isAdminObs.subscribe(d => {
      this.isAdmin = d;
      // console.log('is admin: ' + this.isAdmin);
    }
    );
  }
  Logged(){
    this.isLogged=false;
    console.log(this.miAuth.getUserName())
    if(this.miAuth.getToken().includes(NO_TOKEN))
    {
      this.isLogged=false;
    }
    else
    {
      this.isLogged=true;
    }
    if (localStorage.getItem('dark')=='on') {
      this.themeDark=true;
      this.darkOn()
    }
  }
  swichtTheme() {
    this.themeDark ? this.themeDark = false : this.themeDark = true;
    if (this.themeDark) {
      this.darkOn();
    } else {
      this.darkOff();
    }
  }
  darkOn(){
    document.body.classList.add('darkmode');
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('dark','on');
  }
  darkOff(){
    // window.sessionStorage.removeItem('dark');
    document.body.setAttribute('data-theme', '');
    localStorage.setItem('dark','off');
  }
}
