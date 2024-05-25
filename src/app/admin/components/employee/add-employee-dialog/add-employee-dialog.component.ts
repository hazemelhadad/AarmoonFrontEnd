import { Component, EventEmitter, Output, inject } from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes'; // Import ENTER
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TryService } from '../../../../try.service';





@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.css']
})

export class AddEmployeeDialogComponent {

  @Output() employeeAdded: EventEmitter<void> = new EventEmitter<void>();

  employeeForm: FormGroup;

  employee_ID: number | undefined;
  employee_Name: string | undefined;
  employee_Birthday: string | undefined;
  employee_City: string | undefined;
  employee_BuildingNumber: string | undefined;
  employee_Street_Name: string | undefined;
  employee_Nationality: string | undefined;
  branch_ID: number | undefined;
  employee_Role: string | undefined;
  employeePhones: string[] = [];


  jobOptions: string[] = ['سائق', 'مدير فرع']; 
 

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER] as const;

  announcer = inject(LiveAnnouncer);

  constructor(private formBuilder: FormBuilder, private http: HttpClient , public dialogRef: MatDialogRef<AddEmployeeDialogComponent> , private _service:TryService) {

  
    this.employeeForm = this.formBuilder.group({
      employee_ID: ['', Validators.required],
      employee_Name: ['', Validators.required],
      employee_Birthday: ['', Validators.required],
      employee_City: ['', Validators.required],
      employee_BuildingNumber: ['', Validators.required],
      employee_Street_Name: ['', Validators.required],
      employee_Nationality: ['', Validators.required],
      branch_ID: ['', Validators.required],
      employee_Role: ['', Validators.required],
      employeePhones: ['', Validators.required]
    });
  }

  // Add method to add phone number to the list
    // Add method to add phone number to the list
add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;

  // Add phone number if input is not empty and is valid
  if ((value || '').trim()) {
    this.employeePhones.push(value.trim()); // Push only the value
    this.employeeForm.get('employeePhones')?.setValue(this.employeePhones);
  }

  // Reset the input value
  if (input) {
    input.value = '';
  }
}


  // Remove method to remove phone number from the list
  remove(phone: string): void {
    const index = this.employeePhones.indexOf(phone);
  
    if (index >= 0) {
      this.employeePhones.splice(index, 1);
      this.employeeForm.get('employeePhones')?.setValue(this.employeePhones);
    }
  }
  
  edit(phone: string, event: MatChipEditedEvent): void {
    const newPhone = event.chip.value.trim();
    const index = this.employeePhones .indexOf(phone);
  
    if (index !== -1) {
      this.employeePhones[index] = newPhone;
      this.employeeForm.get('employeePhones')?.setValue(this.employeePhones);
    }
  }
  

 
   
  saveEmployee(): void {
    const employeeData = this.employeeForm.value;
  
    this._service.addEmployee( employeeData)
      .subscribe(
        response => {
          this.employeeAdded.emit(); // Emit event when employee added successfully
          alert('employee added successfully');
          this.dialogRef.close('success'); // Close the dialog with 'success' result
        },
        error => {
          console.error('Error:', error);
        }
      );
  }

  
  
}
