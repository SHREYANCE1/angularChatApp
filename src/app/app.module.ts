import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
//importing for using forms
import { FormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChatModule,
    UserModule,
    SharedModule,
    RouterModule.forRoot([
      {path:'login',component: LoginComponent },
      {path:'',redirectTo:'login', pathMatch: 'full'},
      {path:'*',component: LoginComponent },
      {path:'**',component: LoginComponent }
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
