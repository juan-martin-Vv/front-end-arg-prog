import { NgModule } from '@angular/core';
import { ToastComponent } from './toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ToastComponent
  ],
  exports: [ToastComponent],

  imports: [
    BrowserModule,
    NgbModule,
    CommonModule
  ]
})
export class ToastModule { }
