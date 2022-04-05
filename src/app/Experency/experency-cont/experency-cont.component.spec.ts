import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperencyContComponent } from './experency-cont.component';

describe('ExperencyContComponent', () => {
  let component: ExperencyContComponent;
  let fixture: ComponentFixture<ExperencyContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperencyContComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperencyContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
