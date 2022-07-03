import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get phone () {
    return this.form.controls['phone'];
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

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.modal.close(this.form.value);
      Swal.fire({
        text: 'data added succesfully',
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
