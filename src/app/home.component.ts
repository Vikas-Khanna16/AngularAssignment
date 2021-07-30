import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './Employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private emp:EmployeeService) { }

  ngOnInit(): void {
  }
  get name():String | undefined
  {
    return this.emp.currentEmployee.Name;
  }
}
