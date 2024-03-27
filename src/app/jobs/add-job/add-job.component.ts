import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from '../../_services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html'
})
export class AddJobComponent {
  jobForm: FormGroup;
  setReminder: boolean = false;

  statusOptions: string[] = ['pending', 'declined', 'interview','extended'];
  jobTypeOptions: string[] = ['full-time', 'part-time', 'remote', 'internship'];

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobsService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.jobForm = this.formBuilder.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      status: ['pending'],
      jobType: ['full-time'],
      jobLocation: ['', Validators.required],
      jobLink:['', Validators.required],
      jobDescription:['', Validators.required],
      isReferral: [false],
      isRecruiterCall: [false],
      reminderDate: [''] 
    });

  }

  toggleReminder() {
    this.setReminder = !this.setReminder;
  }

  onSubmit() {
    if (this.jobForm.valid) {
      if (this.setReminder && this.jobForm.get('reminderDate')?.value) {
        this.addJobWithReminder();
      } else {
        this.addJobOnly();
      }
    } else {
      this.toastr.error('Please fill in all required fields.', 'Error');
      this.jobForm.markAllAsTouched();
    }
  }

  addJobWithReminder() {
    this.jobService.addJob(this.jobForm.value).subscribe(
      (newJob: any) => {
        console.log('New job added with reminder:', newJob);
        this.toastr.success('New Job added successfully!', 'Success');
        this.addReminder(); 
        this.resetFormAndNavigate();
      },
      error => {
        console.error('Error adding job:', error);
        this.toastr.error('Error adding job!', 'Error');
      }
    );
  }

  private getUserEmail(): string | null {
    const userString = window.sessionStorage.getItem('auth-user');
    if (userString) {
      try {
        const data = JSON.parse(userString);
        return data.user.email;
        
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
      }
    } else {
      console.error('User not logged in');
      return null;
    }
  }

  private addReminder() {
    const userEmail = this.getUserEmail();
    const formData = { ...this.jobForm.value, reminderDate: this.jobForm.get('reminderDate')?.value }; 
 

    if (userEmail) {
      this.jobService.addReminder(userEmail, formData).subscribe(
        () => {
          console.log('Reminder added successfully');
        },
        error => {
          console.error('Error adding reminder:', error);
          this.toastr.error('Error adding reminder!', 'Error');
        }
      );
    } else {
      console.error('Unable to add reminder without user email');
    }
  }

  addJobOnly() {
    this.jobService.addJob(this.jobForm.value).subscribe(
      (newJob: any) => {
        console.log('New job added:', newJob);
        this.toastr.success('New Job added successfully!', 'Success');
        this.resetFormAndNavigate();
      },
      error => {
        console.error('Error adding job:', error);
        this.toastr.error('Error adding job!', 'Error');
      }
    );
  }

  resetFormAndNavigate() {
    this.resetForm();
    this.router.navigate(['/job/list']);
  }

  resetForm() {
    this.jobForm.reset({
      status: 'pending',
      jobType: 'full-time',
      isReferral: false,
      isRecruiterCall: false
    });
    this.setReminder = false;
  }

  getMinDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  
}
