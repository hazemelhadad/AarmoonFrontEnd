import { Component , OnInit  , ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TryService } from '../../../../try.service';
import { ConfirmDialogComponent } from '../../employee/confirm-dialog/confirm-dialog.component';
import { AddBusyVehicleDialogComponent } from '../add-busy-vehicle-dialog/add-busy-vehicle-dialog.component';

@Component({
  selector: 'app-view-busy-vehicle',
  templateUrl: './view-busy-vehicle.component.html',
  styleUrl: './view-busy-vehicle.component.css'
})
export class ViewBusyVehicleComponent {

  public dataSource:any=new MatTableDataSource<any>();


  displayedColumns: string[]=['employeeId' , 'vehiclePlateNumber',"action" ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(public dialog: MatDialog , private http: HttpClient, private route: ActivatedRoute ,private _service:TryService  ,private router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.getMethod();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }




  openDialog(): void {
    const dialogRef = this.dialog.open(AddBusyVehicleDialogComponent, { width:'40%' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === 'success') {

        this. getMethod()


      }
    });
  }



 

  public getMethod(){

    this._service.getAllbusyVehicles().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);

        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });

  }


  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openConfirmDialog(employee_ID:string , vehiclePlateNumber:string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this Vehicle from use?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteVehicleInUse(employee_ID , vehiclePlateNumber);
      }
    });
  }


  deleteVehicleInUse(employeeId:string , vehiclePlateNumber:string): void {
    this._service.deleteVehicleInUse(employeeId,vehiclePlateNumber).subscribe(
      () => {
        alert(`Vehicle In Use with ID ${employeeId} deleted successfully`);
       this. getMethod()
      },
      error => {
        console.error('Error deleting employee:', error);
      }
    );
  }



}
