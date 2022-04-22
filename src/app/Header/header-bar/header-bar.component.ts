import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private miAuth:TokenService
    ) { }

  ngOnInit(): void {
    this.miAuth.isAdminObs.subscribe(d=>{
                                        this.isAdmin=d;
                                        console.log('is admin: '+this.isAdmin);
    }
                                        );
  }
  editAbout(){}
}
