import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookViewComponent } from './components/book-view/book-view.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { IsAdminGuard } from '../guards/IsAdmin';

const routes: Routes = [

  // { path:'', pathMatch:'full', redirectTo:'books/list'},
  {
    path:'list',
    component:BooksListComponent,
  },
  {
    path: 'view/:id',
    component: BookViewComponent,
    // canActivate:[IsAdminGuard]
  },
  {
    path: 'update/:id',
    component: UpdateBookComponent,
    canActivate:[IsAdminGuard]
  },
  {
    path: 'add',
    component: AddBookComponent,
    canActivate:[IsAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
