import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMoneyBetweenUsersComponent } from './transfer-money-between-users.component';

describe('TransferMoneyBetweenUsersComponent', () => {
  let component: TransferMoneyBetweenUsersComponent;
  let fixture: ComponentFixture<TransferMoneyBetweenUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferMoneyBetweenUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMoneyBetweenUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
