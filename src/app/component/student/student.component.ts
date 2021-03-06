import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/model/student';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  titleFilter = new FormControl('');
  authorFilter = new FormControl('');
  genreFilter = new FormControl('');
  yearFilter = new FormControl('');
  publisherFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['title', 'author', 'genre', 'year', 'publisher', 'details'];
  filterValues = {
    title: '',
    author: '',
    genre: '',
    year: '',
    publisher: ''
  };

  constructor(private route: ActivatedRoute, private studentService:StudentService, private bookService: BookService) {
   }

  student: Student = new Student();
  books: Book[] = new Array();
  book: Book = new Book();
  allBooks: Book[] = new Array();
  newBook: Book = new Book();;

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id: number = parseInt(idParam, 10);
    if (id) {
      this.studentService.get(id).subscribe(value => {
        this.student = value;
        this.books = this.student.books;
        console.log('student books: '+this.books);
      });
    }
    this.bookService.getAllAvailableBooks().subscribe(value => {
      this.allBooks = value; 
      console.log('all books: '+this.allBooks);
      this.dataSource.data = this.allBooks;
      this.dataSource.filterPredicate = this.createFilter();
    });

    this.setFilters();

  }

  setFilters(){
    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.authorFilter.valueChanges
      .subscribe(
        author => {
          this.filterValues.author = author;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.genreFilter.valueChanges
      .subscribe(
        genre => {
          this.filterValues.genre = genre;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.yearFilter.valueChanges
      .subscribe(
        year => {
          this.filterValues.year = year;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.publisherFilter.valueChanges
      .subscribe(
        publisher => {
          this.filterValues.publisher = publisher;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  return(id: number){
    this.book = this.books.find(i => i.id === id);
    console.log(this.books.indexOf(this.book));
    this.books.splice(this.books.indexOf(this.book), 1);
    this.saveChangesAfterReturn();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (data.title.toLowerCase().indexOf(searchTerms.title) !== -1 || data.title.indexOf(searchTerms.title) !== -1)
        && (data.author.toLowerCase().indexOf(searchTerms.author) !== -1 || data.author.indexOf(searchTerms.author) !== -1)
        // && (data.genre.toLowerCase().indexOf(searchTerms.genre) !== -1 || data.genre.indexOf(searchTerms.genre) !== -1)
        && (data.year.toString().toLowerCase().indexOf(searchTerms.year) !== -1 || data.year.toString().indexOf(searchTerms.year) !== -1)
        && (data.publisher.toLowerCase().indexOf(searchTerms.publisher) !== -1 || data.publisher.indexOf(searchTerms.publisher) !== -1);
    }
    return filterFunction;
  }

  addBook(id: number){
    console.log('INDEX: '+this.allBooks.indexOf(this.allBooks.find(i => i.id === id)));
    this.allBooks.splice(this.allBooks.indexOf(this.allBooks.find(i => i.id === id)), 1)
    this.bookService.get(id).subscribe(value => {
      this.book = value;
      this.books.push(this.book);
      console.log('ADD BOOK: '+this.book.title);
      this.saveChanges();
    })
  }

  saveChanges(){
    if (confirm("Do you want to lend a book to student?")) {
      this.student.books = this.books;
      this.studentService.update(this.student).subscribe(value => {
        this.ngOnInit();
      })
    }
  }

  saveChangesAfterReturn(){
    if (confirm("Did the student return this book?")) {
      this.student.books = this.books;
      this.studentService.update(this.student).subscribe(value => {
        this.ngOnInit();
      })
    }
  }

}
