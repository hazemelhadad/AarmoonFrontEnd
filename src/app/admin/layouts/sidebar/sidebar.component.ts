import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private _AuthService:AuthService){}
  name:any=this._AuthService.userData.EmplyeeName
  auth:any=this._AuthService.userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"][1]
  NotA:boolean=this.auth!='Admin'?true:false
  logout()
  {
    this._AuthService.logout()

  }


}
