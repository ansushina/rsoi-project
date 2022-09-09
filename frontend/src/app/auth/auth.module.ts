import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AuthPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
