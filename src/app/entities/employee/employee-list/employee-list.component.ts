// File generated by Telosys Tools Generator ( version 3.0.0 ) - Date 2018-01-15 ( Time 16:52:42 )

// Modules imports
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// Services imports
import { PagerService } from './../../../services/pager.service';
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { EmployeeService } from './../services/employee.service';

// Models imports
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal;
  private codeToDelete: string;

  private employeeIdToDelete;

  private listOfEmployees: Employee[];
  private listId = 'EMPLOYEE_COMPONENT_LIST';

  private title = 'List of Employees';

  // pager object
  private pager: any = {};
  // paged items
  private pagedItems: any[];

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _notificationService: NotificationService,
    private pagerService: PagerService) { }

  ngOnInit() {
    // On init get all Employees
    this.getAllEmployees();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Employee list
    EmitterService.get(this.listId).subscribe((data: Employee[]) => this.getAllEmployees());
  }

  /**
   * Get all Employee using the service EmployeeService
   */
  getAllEmployees = (): void => {
    this._employeeService.getAll().subscribe(
      (data: Employee[]) => {
        this.listOfEmployees = data;
        this.setPage(1);
      },
      error => {
        this._notificationService.error(
          'Error',
          'An error occured when trying to reach the server');
    });
  }

  editEmployee = (code): void => {
    // Navigate to employee form component
    this._router.navigate(['./employee-form', code]);
  }

  openDeleteModal(code) {
    this.codeToDelete = code;
    this.deleteModal.open();
  }

  confirmDelete() {
    this._employeeService.delete(this.codeToDelete).subscribe(
      result => {
        // Notify Employee list to refresh
        EmitterService.get(this.listId).emit(result);

        this._notificationService.success(
          'Deleted',
          `The car employee with the id='${this.codeToDelete}' was deleted successfuly`);
      },
      error => {
        this._notificationService.error(
          'Error',
          'An error occured when trying to reach the server');
      });

    this.deleteModal.close();
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.listOfEmployees.length, page);

    // get current page of items
    this.pagedItems = this.listOfEmployees.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
