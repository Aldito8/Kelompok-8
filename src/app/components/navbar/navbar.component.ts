import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  form: FormGroup;

  constructor(private employeeService: EmployeeService,
      private fb: FormBuilder) {
    this.form = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  addModalForm() {

  }
  get first () {
    return this.form.controls['first'];
  }

  get last () {
    return this.form.controls['last'];
  }

  get phone () {
    return this.form.controls['phone'];
  }

  get email () {
    return this.form.controls['email'];
  }

  get address () {
    return this.form.controls['address'];
  }

  submit() {
    console.log(this.form);
    this.form.markAsTouched();
    if (this.form.valid) {
      this.employeeService.create(this.form.value).subscribe(() => {
        window.location.reload()
      });
    }
  }

}
