import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StatisticComponent } from "./components/statistic/statistic.component";


const routes: Routes = [
  {
      path: ``,
      component: StatisticComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
