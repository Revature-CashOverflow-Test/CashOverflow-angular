import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { BankAccount } from '../../model/bank-account';
import { FormControl, FormGroup } from '@angular/forms';
import { BankAccountService } from '../../service/bankAccount/bank-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-money-owned',
  templateUrl: './transfer-money-owned.component.html',
  styleUrls: ['./transfer-money-owned.component.css'],
})
export class TransferMoneyOwnedComponent implements OnInit {
  bankAccounts: BankAccount[] = [];
  currentBankAccount: BankAccount | undefined;
  showErrorMessage: boolean = false;


  transferForm = new FormGroup({
    transferFromAccount: new FormControl(''),
    transferToAccount: new FormControl(''),
    transferAmount: new FormControl(),
  });

  constructor(
    private bankAccountService: BankAccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    console.log(this.transferForm.value);
    this.bankAccountService
      .transferFundsOwned(this.transferForm.value)
      .subscribe(
        (resp) => {
          this.success();
          this.router.navigate(['/feed']);
        },
        (msg) => {
          this.error();
          this.showErrorMessage = true;
        }
      );
  }

  ngOnInit(): void {
    this.bankAccounts = this.bankAccountService.getBankAccounts();
  }

  success(): void {
    this.toastr.success('Transfer Success', `Please verify your accounts have updated.`)
  }

  error(): void {
    this.toastr.error('Transfer Error', 'Something went wrong with the transfer, please try again.')
  }
}
