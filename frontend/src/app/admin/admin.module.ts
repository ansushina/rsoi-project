import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './components/statistic/statistic.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    StatisticComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
