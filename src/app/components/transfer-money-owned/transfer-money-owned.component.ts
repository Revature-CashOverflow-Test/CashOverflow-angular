import { EmailService } from './../../service/email/email.service';
import { UserAccount } from './../../model/user-account';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  currentUser: UserAccount ={
    id: 0,
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    creationDate: '',
    emailToggle: false,
    emailValue: 0
  }



  transferForm = new FormGroup({
    transferFromAccount: new FormControl(''),
    transferToAccount: new FormControl(''),
    transferAmount: new FormControl(),
  });

  constructor(
    private bankAccountService: BankAccountService,
    private router: Router,
    private emailService: EmailService,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    this.bankAccountService
      .transferFundsOwned(this.transferForm.value)
      .subscribe(
        (_resp) => {
          if (this.currentUser.emailToggle && this.transferForm.value.transferAmount >= this.currentUser.emailValue) {
            let subject = this.emailService.createEmailSubject(this.transferForm.value);
            let body = this.emailService.createEmailBody(this.transferForm.value);
            let email = {
              "userEmail": this.currentUser.email,
              "emailSubject": subject,
              "emailBody": body
            };

            console.log(this.currentUser);
            console.log(email);

            this.emailService.sendEmailBasic(email).subscribe(_response => console.log("email sent!"), _error => console.log("email failed to send"));
          }
          this.success();
          this.router.navigate(['/feed']);
        },
        (_msg) => {
          this.error();
          this.showErrorMessage = true;
        }
      );
  }

  ngOnInit(): void {
    this.bankAccounts = this.bankAccountService.getBankAccounts();

    console.log(this.bankAccounts.length);
    console.log(this.bankAccounts[0]);

    if (this.bankAccounts.length != 0 && this.bankAccounts[0].user) {
      this.currentUser = this.bankAccounts[0].user;
    }
  }

  success(): void {
    this.toastr.success('Transfer Success', `Please verify your accounts have updated.`)
  }

  error(): void {
    this.toastr.error('Transfer Error', 'Something went wrong with the transfer, please try again.')
  }
}
