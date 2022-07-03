import { Component, enableProdMode, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/emplooye';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  @Input() set employee(employee: Employee) {
    if (employee) {
      this.form.patchValue(employee);
    }
  }
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get first () {
    return this.form.controls['first'];
  }
  get last () {
    return this.form.controls['last'];
  }
  get email () {
    return this.form.controls['email'];
  }
  get address () {
    return this.form.controls['address'];
  }
  get phone () {
    return this.form.controls['phone'];
  }
  

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.modal.close(this.form.value);
      Swal.fire({
        text: 'data changed successfully',
        target: '#custom-target',
        customClass: {
          container: 'position-absolute'
        },
        toast: true,
        position: 'top-right'
      })
    }
  }
}
