import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../models/jobs.model';
import { JobsService } from '../../_services/jobs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html'
})
export class UpdateJobComponent implements OnInit {
  job: Partial<Job> = {};
  jobId: string = '';
  setReminder: boolean = false;
  reminderDate:string='';


  constructor(private jobService: JobsService,
     private route: ActivatedRoute,
     private toastr:ToastrService,
     private router:Router,
     ) { }

  statusOptions: string[] = ['pending', 'declined', 'interview','extended'];
  jobTypeOptions: string[] = ['full-time', 'part-time', 'remote', 'internship'];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const jobId = params.get('id');
      if (jobId) {
        this.jobId = jobId;
        this.fetchJobDetails();
      }
    });
  }

  toggleReminder() {
    this.setReminder = !this.setReminder;
  }

  fetchJobDetails(): void {
    this.jobService.getOneJob(this.jobId).subscribe((data: any) => {
      this.job = data.job;
    });
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
    const formData = { ...this.job, reminderDate: this.reminderDate, jobId:this.jobId };
    console.log(formData); 
 

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

  onSubmit(): void {
    this.jobService.updateJob(this.jobId, this.job).subscribe(() => {
      console.log('Job updated successfully');
      this.toastr.success('Job updated successfully!', 'Success');
      if(this.setReminder){
        this.addReminder();
      }
      this.router.navigate(['job/details/'+this.jobId]);
    }, error => {
      console.error('Error updating job:', error);
      this.toastr.error('Job not updated!', 'Error');
    });
  }


  updateReminderDate(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.reminderDate = inputElement.value;
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
