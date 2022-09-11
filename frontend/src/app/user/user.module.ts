import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './components/user-page/user-page.component';
import {MatTableModule} from '@angular/material/table';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
