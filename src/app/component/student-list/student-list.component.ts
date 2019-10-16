import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/model/student';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  firstNameFilter = new FormControl('');
  lastNameFilter = new FormControl('');
  groupFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['firstName', 'lastName', 'groupName', 'details','delete'];
  filterValues = {
    firstName: '',
    lastName: '',
    groupName: ''
  };


  constructor(private studentService: StudentService) { }

  students: Student[] = new Array();


  ngOnInit() {
    this.getAllStudents();
    this.firstNameFilter.valueChanges
      .subscribe(
        firstName => {
          this.filterValues.firstName = firstName;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lastNameFilter.valueChanges
      .subscribe(
        lastName => {
          this.filterValues.lastName = lastName;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.groupFilter.valueChanges
      .subscribe(
        groupName => {
          this.filterValues.groupName = groupName;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (data.firstName.toLowerCase().indexOf(searchTerms.firstName) !== -1 || data.firstName.indexOf(searchTerms.firstName) !== -1)
        && (data.lastName.toLowerCase().indexOf(searchTerms.lastName) !== -1 || data.lastName.indexOf(searchTerms.lastName) !== -1)
        && (data.groupName.toLowerCase().indexOf(searchTerms.groupName) !== -1 || data.groupName.indexOf(searchTerms.groupName) !== -1);
    }
    return filterFunction;
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe(value => {
      this.students = value;
      this.dataSource.data = this.students;
      this.dataSource.filterPredicate = this.createFilter();
    });
  }

  delete(id: number) {
    this.studentService.delete(id).subscribe(v => {
      this.getAllStudents();
    })
  }

  get(id: number) {
    window.location.href = '/student/' + id;
  }

}
