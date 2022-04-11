import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(public modal:NgbActiveModal) { }

  ngOnInit(): void {
  }
  close(){
    this.modal.close();
  }
}
