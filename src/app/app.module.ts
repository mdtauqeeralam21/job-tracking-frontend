import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LandingComponent } from './layout/landing/landing.component';
import { RouterLink } from '@angular/router';
import { ListJobsComponent } from './jobs/list-jobs/list-jobs.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { AddJobComponent } from './jobs/add-job/add-job.component';
import { UpdateJobComponent } from './jobs/update-job/update-job.component';
import { ProfileComponent } from './components/profile/profile.component';
import { httpInterceptorProviders } from './_helper/http.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    ListJobsComponent,
    JobDetailsComponent,
    AddJobComponent,
    UpdateJobComponent,
    ProfileComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    

  ],
  imports: [
    BrowserModule,AppRoutingModule,RouterLink,ReactiveFormsModule,NgChartsModule,
    AppRoutingModule,FormsModule,HttpClientModule,BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
