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
    return this.http.get<Student[]>('http://localhost:8080/students/all');
  }

  get(id: number): Observable<Student> {
    return this.http.get<Student>('http://localhost:8080/students/get/'+id);
  }

  save(student: Student): Observable<Object> {
    return this.http.post('http://localhost:8080/students/save', student);
  }

  delete(id: number): Observable<Student> {
    return this.http.delete<Student>('http://localhost:8080/students/delete/'+id);
  }

  update(student: Student):  Observable<Object> {
    return this.http.put('http://localhost:8080/students/update', student);
  }
}
