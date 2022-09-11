import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScootersPageComponent } from './components/scooters-page/scooters-page.component';
import { ScootersRoutingModule } from './scooters-routing.module';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';




@NgModule({
  declarations: [
    ScootersPageComponent
  ],
  imports: [
    CommonModule,
    ScootersRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
  ]
})
export class ScootersModule { }
