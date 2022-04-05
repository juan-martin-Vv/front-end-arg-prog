import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperencyUnitComponent } from './experency-unit.component';

describe('ExperencyUnitComponent', () => {
  let component: ExperencyUnitComponent;
  let fixture: ComponentFixture<ExperencyUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperencyUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperencyUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
