import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLastNameComponent } from './change-last-name.component';

describe('ChangeLastNameComponent', () => {
  let component: ChangeLastNameComponent;
  let fixture: ComponentFixture<ChangeLastNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLastNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLastNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
