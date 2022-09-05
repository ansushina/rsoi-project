import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScootersPageComponent } from './components/scooters-page/scooters-page.component';


const routes: Routes = [
    {
        path: ``,
        component: ScootersPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ScootersRoutingModule {
}
