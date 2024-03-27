import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../_services/jobs.service';
import { ChartType, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  defaultStats: any;
  jobStats:any;
  dailyApplications:any[]=[];
  monthlyApplications: any[] =[];
  
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Pending', 'Interview Scheduled', 'Declined','Offer Extended'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: any[] = [
    { data: [], label: 'Count' }
  ];

  
  public barChartLabels2: string[] = [];
  public barChartType2: ChartType = 'bar';
  public barChartLegend2 = true;
  public barChartPlugins2 = [];
  public barChartData2: any[] = [
    { data: [], label: 'Daily Applications' }
  ];

  public barChartLabels3: string[] = ['Full-Time', 'Part-Time', 'Internship','Remote'];
  public barChartType3: ChartType = 'bar';
  public barChartLegend3 = true;
  public barChartPlugins3 = [];
  public barChartData3: any[] = [
    { data: [], label: 'Job Types' }
  ];


  

  constructor(private statsService: JobsService) { }

  ngOnInit(): void {
    this.fetchStats();
    this.fetchDailyApplications();
  }

  private fetchStats(){
    this.statsService.getStats().subscribe(data => {
      this.defaultStats = data.defaultStats;
      this.monthlyApplications=data.monthlyApplications;
      console.log(data.defaultStats);
      this.barChartData[0].data = [this.defaultStats.pending, this.defaultStats.interview, this.defaultStats.declined,this.defaultStats.extended];
    });
  }

  private fetchDailyApplications(){
    this.statsService.getAllStats().subscribe(data => {
      this.dailyApplications = data.dailyApplications;
      const jobStats = data.jobStats;
      console.log(jobStats);
  
      // Extracting dates and counts for chart labels and data
      const dates = this.dailyApplications.map(app => app.date);
      const counts = this.dailyApplications.map(app => app.count);
  
      // Update chart labels for daily applications
      this.barChartLabels2 = dates;
  
      // Update chart data for daily applications
      this.barChartData2 = [{ data: counts, label: 'Daily Applications',backgroundColor: 'rgb(75, 192, 192)'}];
  
      // Extracting job types and their counts for chart labels and data
      const jobTypes = Object.keys(jobStats).map(type => {
        // Customize job type names as needed
        switch(type) {
          case 'fulltime':
            return 'Full-Time';
          case 'parttime':
            return 'Part-Time';
          case 'internship':
            return 'Internship';
          case 'remote':
            return 'Remote';
          default:
            return type;
        }
      });
      const jobCounts = Object.values(jobStats);
  
      // Update chart labels for job types
      this.barChartLabels3 = jobTypes;
  
      // Update chart data for job types
      this.barChartData3 = [{ data: jobCounts, label: 'Job Types', backgroundColor:'#33FF69'}];
    });
  }
  
    generateExcelJobs(){
    this.statsService.getJobsSheet()
      .subscribe(
        (data) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'jobs.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        (error) => {
          console.error('Error exporting jobs:', error.error);
        }
      );
  }
}
