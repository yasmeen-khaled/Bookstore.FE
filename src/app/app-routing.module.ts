import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from './guards/IsAdmin';


const routes: Routes = [
  {
    path: 'books',
    loadChildren: () =>
      import('src/app/books/books.module').then(m => m.BooksModule)
  },
  {
    path: 'users',
    loadChildren: () =>
      import('src/app/users/users.module').then(m => m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
