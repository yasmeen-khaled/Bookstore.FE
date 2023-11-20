import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book.service'
import { Observable } from 'rxjs';
import { BookDetailsModel } from '../../models/book-details-model';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit, OnDestroy{
  Id!:number;
  book!: Observable<BookDetailsModel>;
  constructor(
    private bookService: BookService,
    activeRoute: ActivatedRoute,
    ){
    this.Id = activeRoute.snapshot.params["id"];
  }
  subscriptions: Subscription[] =[];
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.bookService.getById(this.Id).subscribe(
        (data : BookDetailsModel) => {
          this.book = of(data);
        },
        (error) => {
          console.error('Error fetching book by Id:', error);
        }
      )
    );
  }
}
