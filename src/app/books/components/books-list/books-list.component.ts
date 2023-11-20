import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book.service'
import { Observable } from 'rxjs';
import { BookDetailsModel } from '../../models/book-details-model';
import { of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { BookSearchModel } from '../../models/book-search-model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit, OnDestroy{
  books!: Observable<BookDetailsModel[]>;
  token!:any;
  IsAdmin:boolean=false;
  searchModel: BookSearchModel = new BookSearchModel();

  constructor(private bookService: BookService, private router:Router){}

  subscriptions: Subscription[] =[];
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.bookService.Search(this.searchModel).subscribe(
        (data: BookDetailsModel[]) => {
          this.books = of(data);
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      )
    );
    this.token = localStorage.getItem('UserToken2');
    if(this.token){
      const decodedToken = jwt_decode.jwtDecode(this.token) as any;
      if (decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin') {
          this.IsAdmin= true;
        }
    }
  }

  details(book: BookDetailsModel){
    this.router.navigateByUrl('view/'+book.id);
  }
  update(book: BookDetailsModel){
    this.router.navigateByUrl(`update/${book.id}`);
  }
  add(){
    this.router.navigateByUrl('add');
  }
  delete(book: BookDetailsModel, btn:any){
    // console.log(btn.parentElement)
    if(confirm("Are you sure you want to delete this product?")){
      this.bookService.Delete(book.id).subscribe(
        {
          next:(data:any)=>{
            //console.log(data);
            window.location.reload();
          },
          error:(err)=>{
            console.error(err)}
        })
      //console.log("deleted")
    }
  }
  search(): void {
    console.log(this.searchModel)
    this.subscriptions.push(
      this.bookService.Search(this.searchModel).subscribe(
        (data: BookDetailsModel[]) => {
          this.books = of(data);
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      )
    );
  }
}
