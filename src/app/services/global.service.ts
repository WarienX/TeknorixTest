import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobDepartment } from '../interfaces/departments';
import { JobFunction } from '../interfaces/jobfunctions';
import { Jobs } from '../interfaces/jobs';
import { JobLocation } from '../interfaces/locations';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private baseUrl: string = 'https://teknorix.jobsoid.com';
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'https://teknorix.jobsoid.com',
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getJobsList(q?: string, dept?: number, loc?: number, fun?: number) {
    let requrl = `${this.baseUrl}/api/v1/jobs`;
    let paramad = false;
    if ((q != '' && q != null) || loc != null || dept != null || fun != null) {
      requrl = `${requrl}?`;
    }
    if (q != '' && q != null) {
      if (paramad) {
        requrl = `${requrl}&q=${q}`;
      } else {
        requrl = `${requrl}q=${q}`;
      }
      paramad = true;
    }
    if (loc != null) {
      if (paramad) {
        requrl = `${requrl}&loc=${loc}`;
      } else {
        requrl = `${requrl}loc=${loc}`;
      }
      paramad = true;
    }
    if (dept != null) {
      if (paramad) {
        requrl = `${requrl}&dept=${dept}`;
      } else {
        requrl = `${requrl}dept=${dept}`;
      }
      paramad = true;
    }
    if (fun != null) {
      if (paramad) {
        requrl = `${requrl}&fun=${fun}`;
      } else {
        requrl = `${requrl}fun=${fun}`;
      }
      paramad = true;
    }
    return this.http.get<Jobs[]>(requrl, this.httpOptions);
  }
  
  getLocationsList() {
    return this.http.get<JobLocation[]>(`${this.baseUrl}/api/v1/locations`, this.httpOptions);
  }
  
  getDepartmentsList() {
    return this.http.get<JobDepartment[]>(`${this.baseUrl}/api/v1/departments`, this.httpOptions);
  }
  
  getJobFunctionsList() {
    return this.http.get<JobFunction[]>(`${this.baseUrl}/api/v1/functions`, this.httpOptions);
  }
}
