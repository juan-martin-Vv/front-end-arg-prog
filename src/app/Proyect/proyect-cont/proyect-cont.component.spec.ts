import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectContComponent } from './proyect-cont.component';

describe('ProyectContComponent', () => {
  let component: ProyectContComponent;
  let fixture: ComponentFixture<ProyectContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectContComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
