import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../Employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './Employee-list.component.html',
  styleUrls: ['./Employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  dataSource: Employee[] = [];
  displayedColumns: Array<string> = ["Name", "MobileNumber", "IsAdmin", "Action"];
  constructor(private empService: EmployeeService, private router: Router) {
  }

  ngOnInit(): void {
    this.empService.GetAllEmployee().
      pipe(map(emps => emps.filter(emp => emp.IsAdmin == false)))
      .subscribe((emps: Employee[]) => { this.dataSource = emps; });

  }
  Delete(empId: number) {
    if (empId > 0) {
      if (confirm("Are you sure to delete")) {
        console.log("Implement delete functionality here");

        this.empService.Delete(empId).subscribe(msg => {

          console.log('Deleted');
          this.router.navigate(['Employees']);
        });
      }
    }
  }
}