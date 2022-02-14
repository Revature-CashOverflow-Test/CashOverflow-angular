import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedComponent } from './feed/feed.component';
import { CreateBankAccountFormComponent } from './createBankAccountForm/create-bank-account-form/create-bank-account-form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service'; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FeedComponent,
    CreateBankAccountFormComponent,
    LoginComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
