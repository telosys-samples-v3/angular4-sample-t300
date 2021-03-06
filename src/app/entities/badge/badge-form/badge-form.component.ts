// File generated by Telosys Tools Generator ( version 3.0.0 ) - Date 2018-01-15 ( Time 16:52:42 )

// Modules imports
import { NotificationService } from './../../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

// Models and services imports
import { Badge } from './../badge.model';
import { BadgeService } from './../services/badge.service';
import * as _ from 'underscore';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-badge-form',
  templateUrl: './badge-form.component.html',
  styleUrls: ['./badge-form.component.css']
})
export class BadgeFormComponent implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  @ViewChild('deleteModal') deleteModal;

  private title = 'Badge Form';
  private badge: Badge;
  private form: FormGroup;
  private ids;

  private bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private _badgeService: BadgeService,
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
      badgeNumber: ['', Validators.required ],
      authorizationLevel: ['', Validators.required ],
      endOfValidity: ['']
    };
  }

  load = () => {
    this._badgeService.getSingle(this.ids).subscribe(
      (badge: Badge) => {
        this.badge = badge;
        this.form.setValue({
          badgeNumber: badge.badgeNumber,
          authorizationLevel: badge.authorizationLevel,
          endOfValidity: badge.endOfValidity
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
	// If we didn't get a badge, we are adding a badge
    if (!this.badge) {
      this.add();
    } else { // If we didn't get a badge, we are adding a badge
      this.update();
    }
  }

  add = () => {
    this._badgeService.add(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Badge added successfuly');
        this._router.navigate(['./badge-form', this.form.value.badgeNumber]);
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
    this._badgeService.update(<Badge>this.form.getRawValue(), this.ids).subscribe(
      result => this._notificationService.success('Success', 'Badge edited successfuly'),
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
    this._badgeService.delete(this.badge.badgeNumber).subscribe(
      result => {
        this._router.navigate(['./badge-list']);

        this._notificationService.success(
          'Deleted',
          `The badge entry with the id(s)='${this.badge.badgeNumber}' was deleted successfuly`);
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
