import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RentPageComponent } from './components/rent-page/rent-page.component';
import { RentCreationPageComponent } from './component/rent-creation-page/rent-creation-page.component';

const routes: Routes = [
  {
    path: `create`,
    component: RentCreationPageComponent,
  },
  {
    path: ``,
    component: RentPageComponent,
  },
  {
    path: `:rentId`,
    component: RentPageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentRoutingModule {
}
