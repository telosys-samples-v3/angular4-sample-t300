// File generated by Telosys Tools Generator ( version 3.0.0 ) - Date 2018-01-15 ( Time 16:52:43 )

// Modules imports
import { NotificationService } from './../../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

// Models and services imports
import { Shop } from './../shop.model';
import { ShopService } from './../services/shop.service';
import { Country } from './../../country/country.model';
import { CountryService } from './../../country/services/country.service';
import { Employee } from './../../employee/employee.model';
import { EmployeeService } from './../../employee/services/employee.service';
import * as _ from 'underscore';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.css']
})
export class ShopFormComponent implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  @ViewChild('deleteModal') deleteModal;

  private title = 'Shop Form';
  private shop: Shop;
  private form: FormGroup;
  private ids;

  private bsConfig: Partial<BsDatepickerConfig>;

  // Country Select
  private countrysData: Country[];

  // Employee Select
  private employeesData: Employee[];

  constructor(
    private _countryService: CountryService,
    private _employeeService: EmployeeService,
    private _shopService: ShopService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService) {

    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
  }

  ngOnInit() {
    this.getIdFromRouteParams();
    this.fetchCountrys();
    this.fetchEmployees();
    this.initForm();
  }

  getIdFromRouteParams = () => {
    this._route.params.subscribe(p => {
        this.ids = _.values(p);
    });
  }

  fetchCountrys = () => {
    this._countryService.getAll().subscribe(
      (data: Country[]) => this.countrysData = data,
      error => console.error(error));
  }

  fetchEmployees = () => {
    this._employeeService.getAll().subscribe(
      (data: Employee[]) => this.employeesData = data,
      error => console.error(error));
  }

  initForm = () => {
    this.form = this._formBuilder.group(this.getNewForm());
    if (!_.isEmpty(this.ids)) {
      this.load();
    }
  }

  getNewForm = () => {
    return {
      code: ['', Validators.required ],
      name: [''],
      address1: [''],
      address2: [''],
      zipCode: [''],
      city: [''],
      countryCode: ['', Validators.required ],
      phone: [''],
      email: [''],
      executive: ['']
    };
  }

  load = () => {
    this._shopService.getSingle(this.ids).subscribe(
      (shop: Shop) => {
        this.shop = shop;
        this.form.setValue({
          code: shop.code,
          name: shop.name,
          address1: shop.address1,
          address2: shop.address2,
          zipCode: shop.zipCode,
          city: shop.city,
          countryCode: shop.countryCode,
          phone: shop.phone,
          email: shop.email,
          executive: shop.executive
        });
      },
      error => {
        if (error.status === this.NOT_FOUND_ERROR) {
          this._notificationService.error(error.statusText, 'Entity not found in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
      });
  }

  save = () => {
	// If we didn't get a shop, we are adding a shop
    if (!this.shop) {
      this.add();
    } else { // If we didn't get a shop, we are adding a shop
      this.update();
    }
  }

  add = () => {
    this._shopService.add(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Shop added successfuly');
        this._router.navigate(['./shop-form', this.form.value.code]);
      },
      error => {
        if (error.status === this.CONFLICT_ERROR) {
          this._notificationService.error(error.statusText, 'Id already used in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
      });
  }

  update = () => {
    this._shopService.update(<Shop>this.form.getRawValue(), this.ids).subscribe(
      result => this._notificationService.success('Success', 'Shop edited successfuly'),
      error => {
        if (error.status === this.NOT_FOUND_ERROR) {
          this._notificationService.error(error.statusText, 'Entity not found in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
      });
  }

  openDeleteModal = () => {
    this.deleteModal.open();
  }

  confirmDelete = (): void => {
    // Call delete service
    this._shopService.delete(this.shop.code).subscribe(
      result => {
        this._router.navigate(['./shop-list']);

        this._notificationService.success(
          'Deleted',
          `The shop entry with the id(s)='${this.shop.code}' was deleted successfuly`);
      },
      error => {
        if (error.status === this.NOT_FOUND_ERROR) {
          this._notificationService.error(error.statusText, 'Entity not found in database');
        } else if (error.status === this.INTERNAL_SERVER_ERROR) {
          this._notificationService.error(error.statusText, error.json());
        } else {
          this._notificationService.error('Error', 'An error occured when trying to reach the server');
        }
      });

    this.deleteModal.close();
  }
}