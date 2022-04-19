import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountUserTransferComponent } from './bank-account-user-transfer.component';

describe('BankAccountUserTransferComponent', () => {
  let component: BankAccountUserTransferComponent;
  let fixture: ComponentFixture<BankAccountUserTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountUserTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountUserTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
