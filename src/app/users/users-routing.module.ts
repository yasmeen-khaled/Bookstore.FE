import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IsNotLoggedInGuard } from '../guards/IsNotLoggedIn';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path:'', pathMatch:'full', redirectTo:'users/login'},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsNotLoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
