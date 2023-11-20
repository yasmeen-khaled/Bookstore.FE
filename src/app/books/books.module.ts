import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from './books-routing.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookViewComponent } from './components/book-view/book-view.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book.service';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';

@NgModule({
  declarations: [
    BooksListComponent,
    BookViewComponent,
    UpdateBookComponent,
    AddBookComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    BookService
  ]
})
export class BooksModule { }
