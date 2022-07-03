import { Component, enableProdMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeComponent } from 'src/app/components/add-employee/add-employee.component';
import { EditEmployeeComponent } from 'src/app/components/edit-employee/edit-employee.component';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  id!: string;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) {
    
  }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((employees: Employee[]) => {
      this.employees = employees;
    }) 
  }

  hapus(id: string) {
    Swal.fire({
      title: 'Are you sure want to delete?',
      showCloseButton: true,
      showDenyButton: true,
      
      confirmButtonText: 'OK',
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.delete(id).subscribe(() => {
          Swal.fire({
            text: 'data deleted successfully',
            target: '#custom-target',
            customClass: {
              container: 'position-absolute'
            },
            toast: true,
            position: 'top-right'
          }
          )
          const idx = this.employees.findIndex(q => q._id === id);
          this.employees.splice(idx, 1);
        });
      }
    })
  }

  editModal(emplooye: Employee, id: string) {
    const modal = this.modalService.open(EditEmployeeComponent, {centered: true, ariaLabelledBy: 'modal-basic-title'});
    modal.componentInstance.emplooye = emplooye;
    modal.result.then(emplooye => {
      this.employeeService.update(id, emplooye)
      .subscribe(emplooye => {
        const idx = this.employees.findIndex(q => q._id === id);
        this.employees[idx] = {...this.employees[idx], ...emplooye};
      });
    }).catch(e => console.log(e));
  }

  addModal() {
    const modal = this.modalService.open(AddEmployeeComponent, {centered: true});
    modal.result.then(employee => {
      this.employeeService.create(employee)
      .subscribe(employee => this.employees.push(employee));
    }).catch(e => console.log(e));
  }

}
