// File generated by Telosys Tools Generator ( version 3.0.0 ) - Date 2018-01-15 ( Time 16:52:42 )

// Modules imports
import { NotificationService } from './../../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

// Models and services imports
import { Country } from './../country.model';
import { CountryService } from './../services/country.service';
import * as _ from 'underscore';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  @ViewChild('deleteModal') deleteModal;

  private title = 'Country Form';
  private country: Country;
  private form: FormGroup;
  private ids;

  private bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private _countryService: CountryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService) {

    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
  }

  ngOnInit() {
    this.getIdFromRouteParams();
    this.initForm();
  }

  getIdFromRouteParams = () => {
    this._route.params.subscribe(p => {
        this.ids = _.values(p);
    });
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
      name: ['']
    };
  }

  load = () => {
    this._countryService.getSingle(this.ids).subscribe(
      (country: Country) => {
        this.country = country;
        this.form.setValue({
          code: country.code,
          name: country.name
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
	// If we didn't get a country, we are adding a country
    if (!this.country) {
      this.add();
    } else { // If we didn't get a country, we are adding a country
      this.update();
    }
  }

  add = () => {
    this._countryService.add(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Country added successfuly');
        this._router.navigate(['./country-form', this.form.value.code]);
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
    this._countryService.update(<Country>this.form.getRawValue(), this.ids).subscribe(
      result => this._notificationService.success('Success', 'Country edited successfuly'),
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
    this._countryService.delete(this.country.code).subscribe(
      result => {
        this._router.navigate(['./country-list']);

        this._notificationService.success(
          'Deleted',
          `The country entry with the id(s)='${this.country.code}' was deleted successfuly`);
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