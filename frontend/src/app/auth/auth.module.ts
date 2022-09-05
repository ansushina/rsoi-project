import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';



@NgModule({
  declarations: [
    AuthPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
