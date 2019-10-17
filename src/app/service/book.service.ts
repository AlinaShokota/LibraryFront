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
    return this.http.get<Book[]>('http://localhost:8080/books/all');
  }

  get(id: number): Observable<Book> {
    return this.http.get<Book>('http://localhost:8080/books/get/'+id);
  }
}
