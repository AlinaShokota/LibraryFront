import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { StudentComponent } from './component/student/student.component';
import { BookComponent } from './component/book/book.component';
import { StudentListComponent } from './component/student-list/student-list.component';
import { BookListComponent } from './component/book-list/book-list.component';
import { StudentFormComponent } from './component/student-form/student-form.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'student/:id', component: StudentComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'student-form/:id', component: StudentFormComponent },
  { path: 'student-form', component: StudentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
