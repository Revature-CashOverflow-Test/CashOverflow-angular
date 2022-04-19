import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailToggleComponent } from './email-toggle.component';

describe('EmailToggleComponent', () => {
  let component: EmailToggleComponent;
  let fixture: ComponentFixture<EmailToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
