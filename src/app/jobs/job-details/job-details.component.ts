import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../../_services/jobs.service';
import { ToastrService } from 'ngx-toastr';
import { Job } from '../../models/jobs.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html'
})
export class JobDetailsComponent {
  job : any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const jobId = params.get('id')!;
      if (jobId) {
        this.jobService.getOneJob(jobId).subscribe(
          (data: any) => {
            this.job = data.job;
          },
          error => {
            console.error('Error fetching job:', error);
          }
        );
      }
    });
  }

  updateJob(id: string): void {
    this.router.navigate(['/job/update/', id]);
  }


  deleteJob(id: string): void {
    if (!id) {
      console.error('Job ID is required');
      return;
    }

    this.jobService.deleteJob(id).subscribe(
      () => {
        console.log('Job deleted successfully');
        this.toastr.success('Job Deleted!', 'Success');
        this.router.navigate(['/job/list']); 
      },
      error => {
        console.error('Error deleting job:', error);
        this.toastr.error('Error deleting job!', 'Error');
      }
    );
  }

}
