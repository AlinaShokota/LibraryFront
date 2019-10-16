import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/book';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  titleFilter = new FormControl('');
  authorFilter = new FormControl('');
  genreFilter = new FormControl('');
  yearFilter = new FormControl('');
  publisherFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['title', 'author', 'genre', 'year', 'publisher', 'details', 'modify', 'delete'];
  filterValues = {
    title: '',
    author: '',
    genre: '',
    year: '',
    publisher: ''
  };

  constructor(private bookService: BookService) { }

  books: Book[] = new Array();
  ngOnInit() {
    this.bookService.getAllBooks().subscribe(value => {
      this.books = value;
      this.dataSource.data = this.books;
      this.dataSource.filterPredicate = this.createFilter();
    });
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

}
