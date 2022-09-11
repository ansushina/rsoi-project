import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NonAuthGuard } from './core/guards/non-auth.guard';
// import { AuthGuard } from './auth/guards/auth.guard';
// import { NonAuthGuard } from './auth/guards/non-auth.quard';

const routes: Routes = [
    {
        path: `auth`,
        loadChildren: () => import(`./auth/auth.module`).then((module) => module.AuthModule),
        canActivate: [NonAuthGuard],
    },
    {
        path: ``,
        loadChildren: () => import(`./scooters/scooters.module`).then((module) => module.ScootersModule),
        canActivate: [AuthGuard],
    },
    {
        path: `rent`,
        loadChildren: () => import(`./rent/rent.module`).then((module) => module.RentModule),
        canActivate: [AuthGuard],
    },
    {
      path: `user`,
      loadChildren: () => import(`./user/user.module`).then((module) => module.UserModule),
      canActivate: [AuthGuard],
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
