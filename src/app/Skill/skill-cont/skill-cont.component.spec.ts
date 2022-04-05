import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillContComponent } from './skill-cont.component';

describe('SkillContComponent', () => {
  let component: SkillContComponent;
  let fixture: ComponentFixture<SkillContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillContComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
