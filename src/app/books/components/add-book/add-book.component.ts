import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from './../../services/book.service';
import { BookDetailsModel } from '../../models/book-details-model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  bookForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router : Router)
  {}

  subscriptions: Subscription[] =[];
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      cover: [null, Validators.required],
    });
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.bookForm.patchValue({ cover: file });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      let formData = new FormData();
      formData.append('title', this.bookForm.value.title);
      formData.append('summary', this.bookForm.value.summary);
      formData.append('price', this.bookForm.value.price);
      formData.append('cover', this.bookForm.value.cover);

      this.subscriptions.push(
        this.bookService.Insert(formData).subscribe(
          (response) => {
            console.log('Book added successfully!', response);
            this.router.navigateByUrl('books/list');
          },
          (error) => {
            console.error('Error adding book:', error);
          }
        )
      );
    }
  }
}
