import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './layout/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ListJobsComponent } from './jobs/list-jobs/list-jobs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './authguard.guard';
import { AddJobComponent } from './jobs/add-job/add-job.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { UpdateJobComponent } from './jobs/update-job/update-job.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'forgotpassword', component:ForgotPasswordComponent},
  {path:'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'job',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListJobsComponent },
      { path: 'add', component: AddJobComponent },
      { path: 'details/:id', component: JobDetailsComponent },
      { path: 'update/:id', component: UpdateJobComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
