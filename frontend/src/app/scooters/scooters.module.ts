import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScootersPageComponent } from './components/scooters-page/scooters-page.component';
import { ScootersRoutingModule } from './scooters-routing.module';



@NgModule({
  declarations: [
    ScootersPageComponent
  ],
  imports: [
    CommonModule,
    ScootersRoutingModule,
  ]
})
export class ScootersModule { }
