import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { EmployeeListComponent } from './Employee/Employee-list.component';
import { EmployeeComponent } from './Employee/Employee.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Login' },
  { path: 'Login', component: LoginComponent, },
  { path: 'Home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'Employees', component: EmployeeListComponent, canActivate:[AuthGuard],
   children: [
    {
        path: ":Id",
        component: EmployeeComponent,
       
    }] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
