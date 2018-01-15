// File generated by Telosys Tools Generator ( version 3.0.0 ) - Date 2018-01-15 ( Time 16:52:43 )

// Modules imports
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// Services imports
import { PagerService } from './../../../services/pager.service';
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
import { ShopService } from './../services/shop.service';

// Models imports
import { Shop } from '../shop.model';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal;
  private codeToDelete: string;

  private shopIdToDelete;

  private listOfShops: Shop[];
  private listId = 'SHOP_COMPONENT_LIST';

  private title = 'List of Shops';

  // pager object
  private pager: any = {};
  // paged items
  private pagedItems: any[];

  constructor(
    private _shopService: ShopService,
    private _router: Router,
    private _notificationService: NotificationService,
    private pagerService: PagerService) { }

  ngOnInit() {
    // On init get all Shops
    this.getAllShops();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh Shop list
    EmitterService.get(this.listId).subscribe((data: Shop[]) => this.getAllShops());
  }

  /**
   * Get all Shop using the service ShopService
   */
  getAllShops = (): void => {
    this._shopService.getAll().subscribe(
      (data: Shop[]) => {
        this.listOfShops = data;
        this.setPage(1);
      },
      error => {
        this._notificationService.error(
          'Error',
          'An error occured when trying to reach the server');
    });
  }

  editShop = (code): void => {
    // Navigate to shop form component
    this._router.navigate(['./shop-form', code]);
  }

  openDeleteModal(code) {
    this.codeToDelete = code;
    this.deleteModal.open();
  }

  confirmDelete() {
    this._shopService.delete(this.codeToDelete).subscribe(
      result => {
        // Notify Shop list to refresh
        EmitterService.get(this.listId).emit(result);

        this._notificationService.success(
          'Deleted',
          `The car shop with the id='${this.codeToDelete}' was deleted successfuly`);
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
    this.pager = this.pagerService.getPager(this.listOfShops.length, page);

    // get current page of items
    this.pagedItems = this.listOfShops.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}