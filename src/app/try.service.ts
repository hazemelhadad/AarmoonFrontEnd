import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TryService {

  constructor(private _http: HttpClient,private _AuthService:AuthService) { }
  headers:any={accept: '*/*', Authorization: 'Bearer '+localStorage.getItem('eToken'),}
  headers2:any={
    accept: '*/*',
    Authorization: 'Bearer ' + localStorage.getItem('eToken'),
    'Content-Type': 'application/json'
  }
  auth:any=this._AuthService.userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"][1]

  // employee APIs


  // put

  updateEmployee(id: string, data: any): Observable<any> {
    const url= `https://localhost:7190/api/SuperAdminController/UpdateEmployees/${id}` ;
    const url2= `https://localhost:7190/api/AdminController/UpdateEmployeeData/${id}`;

    const f=this.auth=="Admin"?url2:url

    return this._http.put(f, data, {
      headers: this.headers2
    });
  }

  // get employee

  getAllEmployees(): Observable<any> {
    const url= 'https://localhost:7190/api/SuperAdminController/GetAllCompanyEmployees';
    const url2= 'https://localhost:7190/api/AdminController/GetAllEmployeesByBranch';

    const f=this.auth=="Admin"?url2:url

    return this._http.get(f,{
      headers:this.headers
    });
  }

  // post

  addEmployee(data: any): Observable<any> {

    const url= 'https://localhost:7190/api/SuperAdminController/AddEmployee';
    const url2= 'https://localhost:7190/api/AdminController/AddEmployee';

    const f=this.auth=="Admin"?url2:url
    return this._http.post(f, data,{
      headers:this.headers2
    });
  }

  // delete

  deleteEmployee(id: number): Observable<any> {
    const url =`https://localhost:7190/api/SuperAdminController/DeleteEmployee/${id}`;
    const url2 =`https://localhost:7190/api/AdminController/DeleteEmployee/${id}`;
    const f=this.auth=="Admin"?url2:url

    return this._http.delete(f,{
      headers:this.headers
    });
  }




  // ///////    vehicles APIs ////////////////////

  // get  vehicles

  getAllVehicles(): Observable<any> {
    const url= 'https://localhost:7190/api/SuperAdminController/GetAllVehicles';
    const url2= 'https://localhost:7190/api/AdminController/GetAllVehiclesByBranch';

    const f=this.auth=="Admin"?url2:url
    return this._http.get(f,{
      headers:this.headers
    });
  }


  // add vehicles

  addVehicle(data: any): Observable<any> {

    const url= 'https://localhost:7190/api/SuperAdminController/AddVehicle';
    const url2= '';

    const f=this.auth=="Admin"?url2:url
    return this._http.post(f, data,{
      headers:this.headers2
    });
  }

  // update vehicle 

  updateVehicle(pltNum: string, data: any): Observable<any> {
    const url= `https://localhost:7190/api/SuperAdminController/UpdateVehicleData/${pltNum}` ;
    const url2= ``;

    const f=this.auth=="Admin"?url2:url

    return this._http.put(f, data, {
      headers: this.headers2
    });
  }



  // delete vehicle

  deleteVehicle(pltNum: string): Observable<any> {
    const url =`https://localhost:7190/api/SuperAdminController/DeleteVehicle/${pltNum}`;
    const url2 =``;
    const f=this.auth=="Admin"?url2:url

    return this._http.delete(f,{
      headers:this.headers
    });
  }





  

  ///=========================Branches==============================================

  getAllBranches(): Observable<any> {
    const url= 'https://localhost:7190/api/SuperAdminController/GetAllBranches';
    return this._http.get(url,{
      headers:this.headers
    });
  }


  // add branch

    addBranch(data: any): Observable<any> {
    const url= 'https://localhost:7190/api/SuperAdminController/AddBranch';
    return this._http.post(url, data,{
      headers:this.headers2
    });
  }


  // update branch ///

  updateBranch(BranchID:number, data: any): Observable<any> {
    const url= `https://localhost:7190/api/SuperAdminController/EditBranch/${BranchID}` ;
    return this._http.put(url, data, {
      headers: this.headers2
    });
  }


  /// delete branch ////
 
  deleteBranch(BranchID:number): Observable<any> {
    const url =`https://localhost:7190/api/SuperAdminController/DeleteBranch/${BranchID}`;
    return this._http.delete(url,{
      headers:this.headers
    });
  }


  ///////////// busy vehicles //////////////////////



 /// get busy vehicle

  getAllbusyVehicles(): Observable<any> {
    const url= 'https://localhost:7190/api/SuperAdminController/GetAllVehiclesInUse';
    const url2= 'https://localhost:7190/api/AdminController/GetAllVehiclesInUse';

    const f=this.auth=="Admin"?url2:url
    return this._http.get(f,{
      headers:this.headers
    });
  }


//// add busy vehicle ///////


addBusyVehicle(data: any): Observable<any> {

  const url= 'https://localhost:7190/api/AdminController/AssignEmployeeToVehicle';
  return this._http.post(url, data,{
    headers:this.headers2
  });
}

///// delete//////

deleteVehicleInUse(id:string , pltNum:string): Observable<any> {
  const url =`https://localhost:7190/api/AdminController/FreeTheVehicleFromSingleEmployee/${id}/${pltNum}`;
  return this._http.delete(url,{
    headers:this.headers
  });
}




}
