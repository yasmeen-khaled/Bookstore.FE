import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IsNotLoggedInGuard } from '../guards/IsNotLoggedIn';

const routes: Routes = [
  { path:'', pathMatch:'full', redirectTo:'login'},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
