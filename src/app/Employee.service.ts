import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable, of, Observable } from 'rxjs'
import * as data from "db.json"
import { map, tap, delay } from 'rxjs/operators'
import { JsonPipe } from '@angular/common';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {
  public IsAuthenticated: boolean = false;
  public url = "http://localhost:3000/Employees"
  private emps: Array<Employee> = []
  public currentEmployee: Employee = new Employee();

  constructor(private httpClient: HttpClient) {
    // const d$ = of(data);
    // const mapped$ = d$.subscribe(ele => { this.emps = ele.data });

  }

  public ngOnInit() { }

  public Logout() {
    this.IsAuthenticated = false;
  }
  
  public AuthenticateEmployee(userName: string, password: string):Observable<Employee[]> {
     return  this.GetAllEmployee().pipe(map(data => data.filter(row => 
      {
        if(row.UserName == userName && row.Password === password && row.IsAdmin === true)
        {
          this.IsAuthenticated = true;
          this.currentEmployee = row;
        }
      }
    )));

    
  }

  public GetAllEmployee() {
    return this.httpClient.get<Employee[]>(this.url,
      {
        headers: new HttpHeaders({ 'custom-header': 'hello' }),

      });
  }

  public GetEmployee(id: number = 0) {
    return this.httpClient.get<Employee[]>(this.url,
      {
        headers: new HttpHeaders({ 'custom-header': 'hello' }),
        params: new HttpParams().set('id', id)
      });
  }

  public UpdateEmployee(emp: Employee) {
   return this.httpClient.put(this.url+'/'+emp.id, emp);
     
  }
  public Save(emp: Employee):Observable<Employee> {
    return  this.httpClient.post<Employee>('http://localhost:3000/Employees/', emp);
  }

  public Delete(empId:number)
  {
    return this.httpClient.delete(this.url+'/'+empId);

  }
}

