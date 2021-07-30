import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Employee.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserProfile = new FormGroup({
    UserName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required,])

  });

  constructor(private empService: EmployeeService, private router: Router) { }
  public get UserProfileFormControl() {
    return this.UserProfile.controls;
  }
  ngOnInit(): void {
  }
  public ValidateEmployee() {

    if (this.UserProfile.valid) {
      this.empService.AuthenticateEmployee(this.UserProfile.value["UserName"], this.UserProfile.value["Password"]).subscribe(col => 
        {
        
        if (this.empService.IsAuthenticated) {
          this.router.navigate(['Home']);
        }
        else{
          alert('Invalid UserName/Password');
        }
      });



    }
  }

}


