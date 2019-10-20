import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('https://my-lib-backend.herokuapp.com/books/all');
  }

  getAllAvailableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('https://my-lib-backend.herokuapp.com/books/available');
  }

  get(id: number): Observable<Book> {
    return this.http.get<Book>('https://my-lib-backend.herokuapp.com/books/get/'+id);
  }

  save(book: Book): Observable<Object> {
    return this.http.post('https://my-lib-backend.herokuapp.com/books/save', book);
  }

  delete(id: number): Observable<Book> {
    return this.http.delete<Book>('https://my-lib-backend.herokuapp.com/books/delete/'+id);
  }
}
