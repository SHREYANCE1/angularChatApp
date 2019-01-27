import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { Cookie } from 'ng2-cookies/ng2-cookies';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([
      {path:'sign-up',component : SignupComponent}
    ]),
    CommonModule
  ]
})
export class UserModule { }
