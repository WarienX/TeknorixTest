import { Injectable } from '@angular/core';
import { JobDepartment } from '../interfaces/departments';
import { JobFunction } from '../interfaces/jobfunctions';
import { Jobs } from '../interfaces/jobs';
import { JobLocation } from '../interfaces/locations';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {
  private selectedLocations: JobLocation[] = [];
  private selectedDepartments: JobDepartment[] = [];
  private selectedFunctions: JobFunction[] = [];
  private filterdJobsList: Jobs[] = [];
  constructor() { }

  getFilteredJobsList(): Jobs[] {
    return this.filterdJobsList;
  }

  addFilteredJob(jobdata: Jobs) {
    let job_index = this.filterdJobsList.findIndex(x => x.id == jobdata.id);
    if (job_index < 0) {
      this.filterdJobsList.push(jobdata);
    }
  }

  getSelectedLocations(): JobLocation[] {
    return this.selectedLocations;
  }

  addSelectedLocation(locdata: JobLocation) {
    /* let locn_index = this.selectedLocations.findIndex(x => x.id == locdata.id);
    if (locn_index < 0) {
      this.selectedLocations.push(locdata);
    } */
    this.selectedLocations[0] = locdata;
  }

  deleteLocation(loc_id: number) {
    let locpos = this.selectedLocations.findIndex(x => x.id == loc_id);
    if (locpos >= 0 && locpos <= this.selectedLocations.length) {
      this.selectedLocations.splice(locpos,1);
    }
  }

  getSelectedDepartments(): JobDepartment[] {
    return this.selectedDepartments;
  }

  addSelectedDepartment(deptdata: JobDepartment) {
    /* let dept_index = this.selectedDepartments.findIndex(x => x.id == deptdata.id);
    if (dept_index < 0) {
      this.selectedDepartments.push(deptdata);
    } */
    this.selectedDepartments[0] = deptdata;
  }

  deleteDepartment(dept_id: number) {
    let deptpos = this.selectedDepartments.findIndex(x => x.id == dept_id);
    if (deptpos >= 0 && deptpos <= this.selectedLocations.length) {
      this.selectedDepartments.splice(deptpos,1);
    }
  }

  getSelectedFunctions(): JobFunction[] {
    return this.selectedFunctions;
  }

  addSelectedFunction(funcdata: JobFunction) {
    /* let func_index = this.selectedFunctions.findIndex(x => x.id == funcdata.id);
    if (func_index >= 0) {
      this.selectedFunctions.push(funcdata);
    } */
    this.selectedFunctions[0] = funcdata;
  }

  deleteJobFunction(func_id: number) {
    let funcpos = this.selectedFunctions.findIndex(x => x.id == func_id);
    if (funcpos >= 0 && funcpos <= this.selectedLocations.length) {
      this.selectedFunctions.splice(funcpos,1);
    }
  }

  resetFilteredJobs() {
    this.filterdJobsList.length = 0;
  }

  resetData() {
    this.filterdJobsList.length = 0;
    this.selectedLocations.length = 0;
    this.selectedDepartments.length = 0;
    this.selectedFunctions.length = 0;
  }
}
