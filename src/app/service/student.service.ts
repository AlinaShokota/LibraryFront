import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('https://my-lib-backend.herokuapp.com/students/all');
  }

  get(id: number): Observable<Student> {
    return this.http.get<Student>('https://my-lib-backend.herokuapp.com/students/get/'+id);
  }

  save(student: Student): Observable<Object> {
    return this.http.post('https://my-lib-backend.herokuapp.com/students/save', student);
  }

  delete(id: number): Observable<Student> {
    return this.http.delete<Student>('https://my-lib-backend.herokuapp.com/students/delete/'+id);
  }

  update(student: Student):  Observable<Object> {
    return this.http.put('https://my-lib-backend.herokuapp.com/students/update', student);
  }
}
