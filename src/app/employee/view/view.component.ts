import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  employee!: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    // First get the id from the current route.
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.employeeService.find(id)
      .subscribe((employee: Employee) => {
      this.employee = employee;
    }, (error) => {
      console.log(error);
    });

  }

}
