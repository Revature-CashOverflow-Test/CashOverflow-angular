import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { BankAccountService } from 'src/app/service/bankAccount/bank-account.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-bank-account-form',
  templateUrl: './create-bank-account-form.component.html',
  styleUrls: ['./create-bank-account-form.component.css'],
})
export class CreateBankAccountFormComponent{

  bankAccount = {
    name: 'asdff',
    description: 'zxcfv',
    accountTypeId: 2,
  };

  formdata = new FormGroup({
    formName: new FormControl(),
    formDescription: new FormControl(),
    formAccountType: new FormControl()
  });

  constructor(
    private bankAccountService: BankAccountService,
    private cookieServ: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) {}


  /**
   * This method populate our bankAccount object to be sent
   * to the server in order to created in the database
   */
  createBankAccount(data: { formName: any; formDescription: any ; formAccountType: any }) {
    this.bankAccount.name = data.formName;
    this.bankAccount.description = data.formDescription;
    this.bankAccount.accountTypeId = data.formAccountType;

    this.bankAccountService.setUserBankAccounts(this.bankAccount).subscribe(
      (_resp) => {
        this.success();
        this.router.navigate(['/feed'])
      }
    );
  }

  success(): void {
    this.toastr.success('Success', `${this.bankAccount.name} has been successfully created`)
  }
}
