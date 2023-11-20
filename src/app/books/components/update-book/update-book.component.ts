import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from './../../services/book.service';
import { BookDetailsModel } from '../../models/book-details-model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {

  bookId!: number;
  bookForm!: FormGroup;
  // bookModel!: BookDetailsModel;
  book:any;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router : Router,
    private activeRoute: ActivatedRoute) {}

  subscriptions: Subscription[] =[];
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  ngOnInit(): void {
    this.bookId = this.activeRoute.snapshot.params["id"];

    this.subscriptions.push(
      this.bookService.getById(this.bookId).subscribe(
        (book: BookDetailsModel) => {
          this.book = book;
          this.initializeForm(book);
        },
        (error: any) => {
          console.error('Error fetching book details:', error);
        }
      )
    );
  }

  initializeForm(book: BookDetailsModel): void {
    this.bookForm = this.fb.group({
      title: [book.title, Validators.required],
      summary: [book.summary, Validators.required],
      price: [book.price, [Validators.required, Validators.min(0)]],
      cover: [book.cover],
      id: [book.id]
    });
    // this.bookForm.patchValue({ cover: book.cover });
    console.log('cover is initialized', this.bookForm)
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.bookForm.patchValue({ cover: file });

    let submitBTN = document.getElementById('btn-submit') as HTMLButtonElement;
    submitBTN.disabled  = false;
  }
  // onFileChange(event: any): void {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.bookForm.patchValue({
  //         cover: e.target.result
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }

  //   let submitBTN = document.getElementById('btn-submit') as HTMLButtonElement;
  //   submitBTN.disabled  = false;
  // }
  initializeImg(event: any){
    this.bookForm.patchValue({ cover: this.book.cover });
    console.log("ivoked")
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      let formData = new FormData();
      formData.append('id', this.bookForm.get('id')?.value);
      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('summary', this.bookForm.get('summary')?.value);
      formData.append('price', this.bookForm.get('price')?.value);
      console.log('2', formData)
      // formData.append('cover', this.bookForm.get('cover')?.value);
      // console.log('cover', this.bookForm.get('cover')?.value)
      // formData.append('cover', this.bookForm.get('cover')?.value, this.bookForm.get('cover')?.value.name);
      const coverFile = this.bookForm.get('cover')?.value;
      if (coverFile instanceof File) {
        formData.append('cover', coverFile);
      }

      const bookModel = this.bookForm.value;

      console.log("upComp", formData,this.bookForm)
      this.subscriptions.push(
        this.bookService.Update(formData).subscribe(
          (data) => {
            console.log('Book Updated successfully!', data);
            this.router.navigateByUrl('books/list');
          },
          (error) => {
            console.error('Error updating book:', error);
          }
        )
      );
    }
  }
}
