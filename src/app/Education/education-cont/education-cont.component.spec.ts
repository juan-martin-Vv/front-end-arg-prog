import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationContComponent } from './education-cont.component';

describe('EducationContComponent', () => {
  let component: EducationContComponent;
  let fixture: ComponentFixture<EducationContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationContComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
