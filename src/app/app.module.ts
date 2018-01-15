// File generated by Telosys Tools Generator ( version 3.0.0 ) - Date 2018-01-15 ( Time 16:52:43 )

// Angular core components
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SidebarModule } from 'ng-sidebar';
import { ModalModule } from 'ngx-modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Routing
import { routing } from './app.routing';

// Components
import { HomeListComponent } from './home-list/home-list.component';
import { AppComponent } from './app.component';

// Author Components
import { AuthorListComponent } from './entities/author/author-list/author-list.component';
import { AuthorFormComponent } from './entities/author/author-form/author-form.component';

// Badge Components
import { BadgeListComponent } from './entities/badge/badge-list/badge-list.component';
import { BadgeFormComponent } from './entities/badge/badge-form/badge-form.component';

// Book Components
import { BookListComponent } from './entities/book/book-list/book-list.component';
import { BookFormComponent } from './entities/book/book-form/book-form.component';

// BookOrder Components
import { BookOrderListComponent } from './entities/bookOrder/bookOrder-list/bookOrder-list.component';
import { BookOrderFormComponent } from './entities/bookOrder/bookOrder-form/bookOrder-form.component';

// BookOrderItem Components
import { BookOrderItemListComponent } from './entities/bookOrderItem/bookOrderItem-list/bookOrderItem-list.component';
import { BookOrderItemFormComponent } from './entities/bookOrderItem/bookOrderItem-form/bookOrderItem-form.component';

// Bookauthor Components
import { BookauthorListComponent } from './entities/bookauthor/bookauthor-list/bookauthor-list.component';
import { BookauthorFormComponent } from './entities/bookauthor/bookauthor-form/bookauthor-form.component';

// Country Components
import { CountryListComponent } from './entities/country/country-list/country-list.component';
import { CountryFormComponent } from './entities/country/country-form/country-form.component';

// Customer Components
import { CustomerListComponent } from './entities/customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './entities/customer/customer-form/customer-form.component';

// Employee Components
import { EmployeeListComponent } from './entities/employee/employee-list/employee-list.component';
import { EmployeeFormComponent } from './entities/employee/employee-form/employee-form.component';

// EmployeeGroup Components
import { EmployeeGroupListComponent } from './entities/employeeGroup/employeeGroup-list/employeeGroup-list.component';
import { EmployeeGroupFormComponent } from './entities/employeeGroup/employeeGroup-form/employeeGroup-form.component';

// Publisher Components
import { PublisherListComponent } from './entities/publisher/publisher-list/publisher-list.component';
import { PublisherFormComponent } from './entities/publisher/publisher-form/publisher-form.component';

// Review Components
import { ReviewListComponent } from './entities/review/review-list/review-list.component';
import { ReviewFormComponent } from './entities/review/review-form/review-form.component';

// Shop Components
import { ShopListComponent } from './entities/shop/shop-list/shop-list.component';
import { ShopFormComponent } from './entities/shop/shop-form/shop-form.component';

// Synopsis Components
import { SynopsisListComponent } from './entities/synopsis/synopsis-list/synopsis-list.component';
import { SynopsisFormComponent } from './entities/synopsis/synopsis-form/synopsis-form.component';

// Workgroup Components
import { WorkgroupListComponent } from './entities/workgroup/workgroup-list/workgroup-list.component';
import { WorkgroupFormComponent } from './entities/workgroup/workgroup-form/workgroup-form.component';

// Services
import { Configuration } from './app.configuration';
import { AuthorService } from './entities/author/services/author.service';
import { BadgeService } from './entities/badge/services/badge.service';
import { BookService } from './entities/book/services/book.service';
import { BookOrderService } from './entities/bookOrder/services/bookOrder.service';
import { BookOrderItemService } from './entities/bookOrderItem/services/bookOrderItem.service';
import { BookauthorService } from './entities/bookauthor/services/bookauthor.service';
import { CountryService } from './entities/country/services/country.service';
import { CustomerService } from './entities/customer/services/customer.service';
import { EmployeeService } from './entities/employee/services/employee.service';
import { EmployeeGroupService } from './entities/employeeGroup/services/employeeGroup.service';
import { PublisherService } from './entities/publisher/services/publisher.service';
import { ReviewService } from './entities/review/services/review.service';
import { ShopService } from './entities/shop/services/shop.service';
import { SynopsisService } from './entities/synopsis/services/synopsis.service';
import { WorkgroupService } from './entities/workgroup/services/workgroup.service';
import { EmitterService } from './services/emitter.service';
import { NotificationService } from './services/notification.service';
import { PagerService } from './services/pager.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthorListComponent,
    AuthorFormComponent,
    BadgeListComponent,
    BadgeFormComponent,
    BookListComponent,
    BookFormComponent,
    BookOrderListComponent,
    BookOrderFormComponent,
    BookOrderItemListComponent,
    BookOrderItemFormComponent,
    BookauthorListComponent,
    BookauthorFormComponent,
    CountryListComponent,
    CountryFormComponent,
    CustomerListComponent,
    CustomerFormComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeGroupListComponent,
    EmployeeGroupFormComponent,
    PublisherListComponent,
    PublisherFormComponent,
    ReviewListComponent,
    ReviewFormComponent,
    ShopListComponent,
    ShopFormComponent,
    SynopsisListComponent,
    SynopsisFormComponent,
    WorkgroupListComponent,
    WorkgroupFormComponent,
    HomeListComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
	ModalModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule,
    BsDatepickerModule.forRoot(),
    SidebarModule.forRoot()
],
  providers: [
    AuthorService,
    BadgeService,
    BookService,
    BookOrderService,
    BookOrderItemService,
    BookauthorService,
    CountryService,
    CustomerService,
    EmployeeService,
    EmployeeGroupService,
    PublisherService,
    ReviewService,
    ShopService,
    SynopsisService,
    WorkgroupService,
    Configuration,
    EmitterService,
    NotificationService,
    PagerService
],
  bootstrap: [AppComponent]
})
export class AppModule { }