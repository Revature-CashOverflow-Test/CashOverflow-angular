import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFirstNameComponent } from './change-first-name.component';

describe('ChangeFirstNameComponent', () => {
  let component: ChangeFirstNameComponent;
  let fixture: ComponentFixture<ChangeFirstNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeFirstNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeFirstNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
