import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login2Component } from 'src/app/login2/login2.component';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  @Input()
  isAdmin!:boolean;

  constructor(private modal:NgbModal,
    private router:Router,

    ) { }
    gotoLogin(){
      this.router.navigate(['/login',{login:'on'}])
    }
  ngOnInit(): void {
  }
  login2(){
    const login=this.modal.open(Login2Component);
  }
}
