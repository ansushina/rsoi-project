import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentPageComponent } from './components/rent-page/rent-page.component';
import { RentRoutingModule } from './rent-routing.module';



@NgModule({
  declarations: [
    RentPageComponent
  ],
  imports: [
    CommonModule,
    RentRoutingModule,
  ]
})
export class RentModule { }
