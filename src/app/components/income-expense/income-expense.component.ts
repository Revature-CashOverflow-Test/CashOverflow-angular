import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BankAccount } from 'src/app/model/bank-account';
import { BankAccountService } from 'src/app/service/bankAccount/bank-account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css'],
})
export class IncomeExpenseComponent implements OnInit {
  accounts: BankAccount[] = [];
  currentBalance: number = 0;


  transferForm = new FormGroup({
    accountId: new FormControl(''),
    txTypeId: new FormControl(''),
    description: new FormControl(''),
    amount: new FormControl(''),
  });

  newTransaction = {
    id: 0,
    amount: 0,
    description: '',
    creationDate: 0,
    accountId: 0,
    txTypeId: 0
  }

  transactionSuccess: number = 0;

  getCookie(key: string, value: string) {
    this.cookieServ.set(key, value);
  }

  constructor(
    private cookieServ: CookieService,
    private bankServ: BankAccountService,
    private router: Router,
    private toastr: ToastrService
  ) { }



  ngOnInit(): void {
    this.grabAccounts();
  }

  /**
   * @author Cameron, Amir, Chandra
   */
  transaction() {

    this.bankServ.sendTransactionData(this.transferForm.value).subscribe(
      (_data) => {
        this.transactionSuccess = 1;
        this.success();
        this.router.navigate(['/feed']);
      },
      (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.valueError();
          this.transactionSuccess = 2;
        }
        else if (error.status == 417 ) {
          this.valueError();
          document.getElementById('amount')?.classList.add('is-invalid');
        }
      }
    )
  }


  grabAccounts() {
    this.bankServ.getUserBankAccounts().subscribe(
      (data: BankAccount[]) => {
        this.accounts = data;
      },
      (error: HttpErrorResponse) => {
      }
    )
  }

  valueError(): void {
    this.toastr.error('Input Error', 'Please input a number greater than zero.')
  }

  success(): void {
    this.toastr.success('Account Updated', `$${this.transferForm.value.amount} has been added to your account.`)
  }
}
