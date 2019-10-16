import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/model/student';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  public isCollapsed = false;

  constructor(private studentService: StudentService, private fb: FormBuilder, private route: ActivatedRoute) { }

  student: Student;

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      groupName: ['', Validators.required]
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.student = this.form.value;
    this.studentService.save(this.student).subscribe(value => {
      window.location.href = '/student-list';
    });

  }

}
