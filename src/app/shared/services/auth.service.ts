import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) { }
  userData:any;
  logout(){
    localStorage.removeItem('eToken')
    this._Router.navigate(['/'])
  }

  saveUserData(){
    if(localStorage.getItem('eToken')!=null)
      {
        let encode:any=localStorage.getItem('eToken')
        let decode:any=jwtDecode(encode)
        this.userData=decode
        // console.log(decode)
      }
  }


  setLogin(userData:object):Observable<any>
  {
    return this._HttpClient.post('https://localhost:7190/api/Account/login',userData)
  }
}
