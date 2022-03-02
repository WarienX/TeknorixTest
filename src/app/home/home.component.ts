import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JobDepartment } from '../interfaces/departments';
import { JobFunction } from '../interfaces/jobfunctions';
import { Jobs } from '../interfaces/jobs';
import { JobLocation } from '../interfaces/locations';
import { GlobalService } from '../services/global.service';
import { JobSearchService } from '../services/job-search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobsList: Jobs[];
  searchQueryFc = new FormControl('');
  jobDepartmentList: JobDepartment[];
  filteredDepartmentList: JobDepartment[] = [];
  departmentFc = new FormControl();
  jobLocationsList: JobLocation[];
  locationFc = new FormControl();
  jobFunctionsList: JobFunction[];
  functionFc = new FormControl();
  constructor(public jobSearchServ: JobSearchService, private globalServ: GlobalService) { 
    if (this.searchQueryFc.value != null || this.searchQueryFc.value != '') {
      this.filteredDepartmentList.length = 0;
      this.jobSearchServ.resetFilteredJobs();
    }
  }

  ngOnInit() {
    this.getDeprtmentsList();
    this.getLocationsList();
    this.getJobFunctionsList();
  }

  getDeprtmentsList() {
    this.globalServ.getDepartmentsList().subscribe(resp => {
      // console.log(`Departments resp: ${JSON.stringify(resp)}`);
        this.jobDepartmentList = resp;
    }, err => {
      console.error(err.message);
      alert(err.message);
    });
  }

  onDepartmentSelected() {
    let sel_dept = this.jobDepartmentList.find(x => x.id == this.departmentFc.value);
    // console.log(`Selected Department: ${sel_dept.title}(${this.departmentFc.value})`);
    this.jobSearchServ.addSelectedDepartment(sel_dept);
    this.departmentFc.reset();
    this.filterSearch();
  }

  getLocationsList() {
    this.globalServ.getLocationsList().subscribe(resp => {
      // console.log(`Locations resp: ${JSON.stringify(resp)}`);
        this.jobLocationsList = resp;
    }, err => {
      console.error(err.message);
      alert(err.message);
    });
  }

  onLocationSelected() {
    let sel_loc = this.jobLocationsList.find(x => x.id == this.locationFc.value);
    // console.log(`Selected Location: ${sel_loc.title}(${this.locationFc.value})`);
    this.jobSearchServ.addSelectedLocation(sel_loc);
    this.locationFc.reset();
    this.filterSearch();
  }

  getJobFunctionsList() {
    this.globalServ.getJobFunctionsList().subscribe(resp => {
      // console.log(`Job Functions resp: ${JSON.stringify(resp)}`);
      this.jobFunctionsList = resp;
    }, err => {
      console.error(err.message);
      alert(err.message);
    });
  }

  onFunctionSelected() {
    let sel_fun = this.jobFunctionsList.find(x => x.id == this.functionFc.value);
    // console.log(`Selected Function: ${sel_fun.title}(${this.functionFc.value})`);
    this.jobSearchServ.addSelectedFunction(sel_fun);
    this.functionFc.reset();
    this.filterSearch();
  }

  clearAll() {
    this.jobSearchServ.resetData();
  }

  filterSearch() {
    let qstring = null;
    let department_id = null;
    let location_id = null;
    let jobfunc_id = null;
    let deptlist = this.jobSearchServ.getSelectedDepartments();
    let locnlist = this.jobSearchServ.getSelectedLocations();
    let funclist = this.jobSearchServ.getSelectedFunctions();
    if (this.searchQueryFc.value != null && this.searchQueryFc.value != '') {
      qstring = this.searchQueryFc.value;
    }
    if (deptlist.length > 0) {
      department_id = deptlist[0].id;
    }
    if (locnlist.length > 0) {
      location_id = locnlist[0].id;
    }
    if (funclist.length > 0) {
      jobfunc_id = funclist[0].id;
    }
    if (deptlist.length > 0 || locnlist.length > 0 || funclist.length > 0 || (this.searchQueryFc.value != null && this.searchQueryFc.value != '')) {
      this.globalServ.getJobsList(qstring, department_id, location_id, jobfunc_id).subscribe(jobsResp => {
        this.filteredDepartmentList.length = 0;
        this.jobSearchServ.resetFilteredJobs();
        if (jobsResp.length > 0) {
          for (let item of jobsResp) {
            this.jobSearchServ.addFilteredJob(item);
            if (this.filteredDepartmentList.length == 0) {
              this.filteredDepartmentList.push(item.department);
            } else {
              let dept_index = this.filteredDepartmentList.findIndex(x => x.id == item.department.id);
              if (dept_index < 0) {
                this.filteredDepartmentList.push(item.department);
              }
            }
          }
        }
      }, err => {
        console.error(err.message);
        alert(err.message);
      });
    } else {
      this.filteredDepartmentList.length = 0;
      this.jobSearchServ.resetFilteredJobs();
    }
  }

  deleteDepartment(dept_id: number) {
    this.jobSearchServ.deleteDepartment(dept_id);
    this.filterSearch();
  }
  deleteLocation(loc_id: number) {
    this.jobSearchServ.deleteLocation(loc_id);
    this.filterSearch();
  }
  deleteJobFunction(jobfunc_id: number) {
    this.jobSearchServ.deleteJobFunction(jobfunc_id);
    this.filterSearch();
  }

}
