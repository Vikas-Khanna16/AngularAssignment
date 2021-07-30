import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './Employee.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularAssignment';

  constructor(private empservice: EmployeeService, private router:Router) {
  }
  Authenticate(): Boolean {
    return this.empservice.IsAuthenticated;

  }
  Logout()
  {
    this.empservice.IsAuthenticated = false;
    this.router.navigate(['Login']);
  }

}
