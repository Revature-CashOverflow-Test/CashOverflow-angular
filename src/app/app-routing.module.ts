import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountRegisterPageComponent } from './page-layouts/bank-account-register-page/bank-account-register-page.component';
import { UserPageComponent } from './page-layouts/user-page/user-page.component';
import { CanActivateRouteGuard } from './components/guard/can-activate-route.guard';
import { LoginPageComponent } from './page-layouts/login-page/login-page.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterPageComponent } from './page-layouts/register-page/register-page.component';
import { BankAccountPageComponent } from './page-layouts/bank-account-page/bank-account-page.component';
import { BankAccountMoneyTransferComponent } from './page-layouts/bank-account-money-transfer/bank-account-money-transfer.component';
import { ManageAccountBalanceComponent } from './page-layouts/manage-account-balance/manage-account-balance.component';
import { SettingsComponent } from './page-layouts/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'feed', component: UserPageComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'bankAccount', component: BankAccountPageComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'createBankAccountForm', component: BankAccountRegisterPageComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'transferMoneyBankAccount', component: BankAccountMoneyTransferComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'manageBankAccountBalance', component: ManageAccountBalanceComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'register', component: RegisterPageComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'settings', component: SettingsComponent},
  { path: '**', redirectTo: '/feed' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
