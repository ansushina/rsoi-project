import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes = [
    {
        path: ``,
        component: AuthPageComponent
    },
    {
      path: `sign-up`,
      component: RegisterPageComponent,
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {
}
