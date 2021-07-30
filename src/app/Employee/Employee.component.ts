import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Employee } from '../Employee';
import { EmployeeService } from '../Employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './Employee.component.html',
  styleUrls: ['./Employee.component.css']
})
export class EmployeeComponent implements OnInit {
  UserName: any = ""
  emp: Employee = new Employee();


  constructor(private empservice: EmployeeService, private route: ActivatedRoute, private router:Router) {

  }

  EmployeeForm = new FormGroup({
    Id: new FormControl(),
    UserName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    Name: new FormControl('', [Validators.required]),
    MobileNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{11}")]),
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('Id');
      if (id != null && parseInt(id) > 0) {
        // this.mode = "Edit";
        this.empservice.GetEmployee(parseInt(id)).subscribe((data) => {
          this.emp = data[0];
        });
      }
    });
  }
  Save() {
    if (this.EmployeeForm.valid) {
      if (this.emp.id > 0) {
        this.empservice.UpdateEmployee(this.emp).subscribe(msg=>{this.router.navigate(['Employees']) },error=>console.log(error));
      }
      else {
        let id: number = 0;
        this.empservice.GetAllEmployee().subscribe(emps=> {
          
          this.emp.id = emps.length+1;
          this.emp.IsAdmin = false;
          this.empservice.Save(this.emp).subscribe(response=>{
            this.router.navigate(['Employees']) },error=>console.log(error));
        });
       
      }
      
    }
  }
  Cancel() {
    this.router.navigate(['Employees']);
  }

  public get EmployeeFormControl() {
    return this.EmployeeForm.controls;
  }
}

