import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  
  public form: FormGroup;
  submitted = false;
  public isCollapsed = false;

  constructor(private bookService: BookService, private fb: FormBuilder) { }

  book:Book;
  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      year: ['', Validators.required],
      publisher: ['', Validators.required]
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.book = this.form.value;
    this.bookService.save(this.book).subscribe(value => {
      window.location.href = '/book-list';
    });
  }

}
