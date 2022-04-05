import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationUnitComponent } from './education-unit.component';

describe('EducationUnitComponent', () => {
  let component: EducationUnitComponent;
  let fixture: ComponentFixture<EducationUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
