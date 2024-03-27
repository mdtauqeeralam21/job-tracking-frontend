import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/jobs.model';


const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http:HttpClient){}


  private apiUrl='http://localhost:4000/api/v1/jobs';
  
  fetchJobs(queryParams: { [key: string]: string }): Observable<any[]> {
    const queryString = Object.keys(queryParams)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key])).join('&');
         const endpoint = this.apiUrl + '?' + queryString;
    return this.http.get<any[]>(endpoint,httpOptions);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<any>(`${this.apiUrl}`, job);
  }

  getOneJob(jobId:string): Observable<Job> {
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.get<Job>(url);
  }

  updateJob(jobId: string, updatedJob: Partial<Job>): Observable<Job> {
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.patch<Job>(url, updatedJob);
  }

  deleteJob(jobId: string): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${jobId}`;
    return this.http.delete<void>(deleteUrl);
  }

  getStats(): Observable<any> {
    const statsUrl=`${this.apiUrl}/stats`
    return this.http.get<any>(statsUrl);
  }

  getAllStats(): Observable<any> {
    const statsUrl=`${this.apiUrl}/getstats`
    return this.http.get<any>(statsUrl);
  }


  getJobsSheet():Observable<Blob>{
    const jobsUrl=`${this.apiUrl}/export`
    return this.http.get<any>(jobsUrl,{
      responseType:'blob' as 'json'
    });
  }

  addReminder(email:any,formData:any): Observable<void>{
    const body = {email, formData};
    return this.http.post<any>(`http://localhost:4000/api/v1/remind`,body);
  }

}
