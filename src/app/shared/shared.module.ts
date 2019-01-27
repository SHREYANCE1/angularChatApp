import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstCharComponent } from './first-char/first-char.component';
//import { PipeComponent } from './pipe/pipe.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
//import { PipeComponent } from './pipe/remove-special-char.pipe';

@NgModule({
  declarations: [FirstCharComponent,UserDetailsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UserDetailsComponent,
    FirstCharComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
