import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentPageComponent } from './components/rent-page/rent-page.component';
import { RentRoutingModule } from './rent-routing.module';
import { RentCreationPageComponent } from './component/rent-creation-page/rent-creation-page.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    RentPageComponent,
    RentCreationPageComponent
  ],
  imports: [
    CommonModule,
    RentRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatNativeDateModule
  ]
})
export class RentModule { }
