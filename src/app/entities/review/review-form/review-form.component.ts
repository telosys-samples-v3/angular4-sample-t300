// File generated by Telosys Tools Generator ( version 3.0.0 ) - Date 2018-01-15 ( Time 16:52:43 )

// Modules imports
import { NotificationService } from './../../../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

// Models and services imports
import { Review } from './../review.model';
import { ReviewService } from './../services/review.service';
import { Customer } from './../../customer/customer.model';
import { CustomerService } from './../../customer/services/customer.service';
import { Book } from './../../book/book.model';
import { BookService } from './../../book/services/book.service';
import * as _ from 'underscore';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

  // HTTP status code
  readonly NOT_FOUND_ERROR = 404;
  readonly CONFLICT_ERROR = 409;
  readonly INTERNAL_SERVER_ERROR = 500;

  @ViewChild('deleteModal') deleteModal;

  private title = 'Review Form';
  private review: Review;
  private form: FormGroup;
  private ids;

  private bsConfig: Partial<BsDatepickerConfig>;

  // Customer Select
  private customersData: Customer[];

  // Book Select
  private booksData: Book[];

  constructor(
    private _customerService: CustomerService,
    private _bookService: BookService,
    private _reviewService: ReviewService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService) {

    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
  }

  ngOnInit() {
    this.getIdFromRouteParams();
    this.fetchCustomers();
    this.fetchBooks();
    this.initForm();
  }

  getIdFromRouteParams = () => {
    this._route.params.subscribe(p => {
        this.ids = _.values(p);
    });
  }

  fetchCustomers = () => {
    this._customerService.getAll().subscribe(
      (data: Customer[]) => this.customersData = data,
      error => console.error(error));
  }

  fetchBooks = () => {
    this._bookService.getAll().subscribe(
      (data: Book[]) => this.booksData = data,
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
      customerCode: ['', Validators.required ],
      bookId: ['', Validators.required ],
      reviewText: [''],
      reviewNote: [''],
      creation: [''],
      lastUpdate: ['']
    };
  }

  load = () => {
    this._reviewService.getSingle(this.ids).subscribe(
      (review: Review) => {
        this.review = review;
        this.form.setValue({
          customerCode: review.customerCode,
          bookId: review.bookId,
          reviewText: review.reviewText,
          reviewNote: review.reviewNote,
          creation: review.creation,
          lastUpdate: review.lastUpdate
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
	// If we didn't get a review, we are adding a review
    if (!this.review) {
      this.add();
    } else { // If we didn't get a review, we are adding a review
      this.update();
    }
  }

  add = () => {
    this._reviewService.add(this.form.value).subscribe(
      result => {
        this._notificationService.success('Success', 'Review added successfuly');
        this._router.navigate(['./review-form', this.form.value.customerCode, this.form.value.bookId]);
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
    this._reviewService.update(<Review>this.form.getRawValue(), this.ids).subscribe(
      result => this._notificationService.success('Success', 'Review edited successfuly'),
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
    this._reviewService.delete(this.review.customerCode, this.review.bookId).subscribe(
      result => {
        this._router.navigate(['./review-list']);

        this._notificationService.success(
          'Deleted',
          `The review entry with the id(s)='${this.review.customerCode}, ${this.review.bookId}' was deleted successfuly`);
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
