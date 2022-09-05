import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RentPageComponent } from './components/rent-page/rent-page.component';

const routes: Routes = [
    {
        path: ``,
        component: RentPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RentRoutingModule {
}
