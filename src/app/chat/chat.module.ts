import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { RouterModule, Routes } from '@angular/router';
//import the module 
import { SharedModule } from '../shared/shared.module';
//import the individual component also
//import { UserDetailsComponent } from '../shared/user-details/user-details.component';
//import { FirstCharComponent } from '../shared/first-char/first-char.component';
import { FormsModule } from '@angular/forms';
import { RemoveSpecialCharPipe } from '../shared/pipe/remove-special-char.pipe';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ChatRouteGaurdService } from './chat-route-gaurd.service';
import { SocketService } from '../socket.service';
//import { RemoveSpecialCharPipe } from '../shared/pipe/remove-special-char.pipe';


@NgModule({
  declarations: [ChatBoxComponent, RemoveSpecialCharPipe ],
  imports: [
    RouterModule.forChild([
      {path:'chat',component:ChatBoxComponent, canActivate:[ChatRouteGaurdService]}
    ]),
    CommonModule,
    SharedModule,
    FormsModule
  ],
  providers:[SocketService,ChatRouteGaurdService]
})
export class ChatModule { }
