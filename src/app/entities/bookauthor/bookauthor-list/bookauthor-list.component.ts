// File generated by Telosys Tools Generator ( version 3.0.0 ) - Date 2018-01-15 ( Time 16:52:42 )

// Modules imports
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// Services imports
import { PagerService } from './../../../services/pager.service';
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { BookauthorService } from './../services/bookauthor.service';

// Models imports
import { Bookauthor } from '../bookauthor.model';

@Component({
  selector: 'app-bookauthor-list',
  templateUrl: './bookauthor-list.component.html',
  styleUrls: ['./bookauthor-list.component.css']
})
export class BookauthorListComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal;

  private bookauthorIdToDelete;

  private listOfBookauthors: Bookauthor[];
  private listId = 'BOOKAUTHOR_COMPONENT_LIST';

  private title = 'List of Bookauthors';

  // pager object
  private pager: any = {};
  // paged items
  private pagedItems: any[];

  constructor(
    private _bookauthorService: BookauthorService,
    private _router: Router,
    private _notificationService: NotificationService,
    private pagerService: PagerService) { }

  ngOnInit() {
    // On init get all Bookauthors
    this.getAllBookauthors();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Bookauthor list
    EmitterService.get(this.listId).subscribe((data: Bookauthor[]) => this.getAllBookauthors());
  }

  /**
   * Get all Bookauthor using the service BookauthorService
   */
  getAllBookauthors = (): void => {
    this._bookauthorService.getAll().subscribe(
      (data: Bookauthor[]) => {
        this.listOfBookauthors = data;
        this.setPage(1);
      },
      error => {
        this._notificationService.error(
          'Error',
          'An error occured when trying to reach the server');
    });
  }

  editBookauthor = (): void => {
    // Navigate to bookauthor form component
    this._router.navigate(['./bookauthor-form', ]);
  }

  openDeleteModal() {
    this.deleteModal.open();
  }

  confirmDelete() {
    this._bookauthorService.delete().subscribe(
      result => {
        // Notify Bookauthor list to refresh
        EmitterService.get(this.listId).emit(result);

        this._notificationService.success(
          'Deleted',
          `The car bookauthor with the id='' was deleted successfuly`);
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
    this.pager = this.pagerService.getPager(this.listOfBookauthors.length, page);

    // get current page of items
    this.pagedItems = this.listOfBookauthors.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}