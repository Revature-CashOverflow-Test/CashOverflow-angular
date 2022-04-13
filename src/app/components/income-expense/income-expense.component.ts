import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BankAccount } from 'src/app/model/bank-account';
import { BankAccountService } from 'src/app/service/bankAccount/bank-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css'],
})
export class IncomeExpenseComponent implements OnInit {
  accounts: BankAccount[] = [];
  currentBalance: number = 0;


  @Input() formAccountId: number = 0;
  @Input() formTransactionType: number = 0;
  @Input() formAmount: number = 0;
  @Input() formName: string = '';
  @Input() formDescription: string = '';

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

    this.newTransaction.accountId = this.formAccountId;
    this.newTransaction.txTypeId = this.formTransactionType;
    this.newTransaction.amount = this.formAmount;
    this.newTransaction.description = this.formDescription;


    this.bankServ.sendTransactionData(this.newTransaction).subscribe(
      (data) => {
        document.getElementById('amount')?.classList.remove('is-invalid');
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
    this.toastr.success('Account Updated', `${this.newTransaction.amount} has been added to Account: ${this.newTransaction.accountId}`)
  }
}
