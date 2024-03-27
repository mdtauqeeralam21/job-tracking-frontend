import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../_services/jobs.service';
import { Job } from '../../models/jobs.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './list-jobs.component.html',
})
export class ListJobsComponent implements OnInit {
  jobs: Job[] = [];
  statusOptions: string[] = ['pending', 'interview', 'declined','extended'];
  jobTypeOptions: string[] = ['full-time', 'part-time', 'remote', 'internship'];
  searchQuery: string = '';
  statusFilter: string = 'all';
  jobTypeFilter: string = 'all';
  sortOption: string = 'latest';

  
  constructor(
    private jobService: JobsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    const queryParams: { [key: string]: string } = {
      status: this.statusFilter,
      jobType: this.jobTypeFilter,
      sort: this.sortOption,
      search: this.searchQuery
    };

    this.jobService.fetchJobs(queryParams).subscribe(
      (data: any) => {
        this.jobs = data.jobs;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  search() {
    this.fetchJobs();
  }

  jobDetails(id:string){
    this.router.navigate(['job/details/'+id]);
  }

  addPage(){
    this.router.navigate(['/job/add']);
  }
}
