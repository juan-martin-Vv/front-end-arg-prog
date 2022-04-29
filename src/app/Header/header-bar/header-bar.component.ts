import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InyectorDataService } from 'src/app/Service/inyector-data.service';
import { TokenService } from 'src/app/Service/token.service';
@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  isAdmin!:boolean;
  navbarfixed:boolean=false;
  constructor(
    private miAuth:TokenService
    ) { }

  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY>100){
      this.navbarfixed=true;
    }
    else{
      this.navbarfixed=false;
    }

  }
  ngOnInit(): void {
    this.miAuth.isAdminObs.subscribe(d=>{
                                        this.isAdmin=d;
                                        console.log('is admin: '+this.isAdmin);
    }
                                        );
  }
  editAbout(){}
}
