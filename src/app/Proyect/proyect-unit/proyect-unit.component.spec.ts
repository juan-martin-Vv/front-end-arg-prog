import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectUnitComponent } from './proyect-unit.component';

describe('ProyectUnitComponent', () => {
  let component: ProyectUnitComponent;
  let fixture: ComponentFixture<ProyectUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
