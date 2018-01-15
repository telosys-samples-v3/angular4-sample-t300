// File generated by Telosys Tools Generator ( version 3.0.0 ) - Date 2018-01-15 ( Time 16:52:43 )

import { Router, RouterModule } from '@angular/router';
import { HomeListComponent } from './home-list/home-list.component';

// Author
import { AuthorListComponent } from './entities/author/author-list/author-list.component';
import { AuthorFormComponent } from './entities/author/author-form/author-form.component';

// Badge
import { BadgeListComponent } from './entities/badge/badge-list/badge-list.component';
import { BadgeFormComponent } from './entities/badge/badge-form/badge-form.component';

// Book
import { BookListComponent } from './entities/book/book-list/book-list.component';
import { BookFormComponent } from './entities/book/book-form/book-form.component';

// BookOrder
import { BookOrderListComponent } from './entities/bookOrder/bookOrder-list/bookOrder-list.component';
import { BookOrderFormComponent } from './entities/bookOrder/bookOrder-form/bookOrder-form.component';

// BookOrderItem
import { BookOrderItemListComponent } from './entities/bookOrderItem/bookOrderItem-list/bookOrderItem-list.component';
import { BookOrderItemFormComponent } from './entities/bookOrderItem/bookOrderItem-form/bookOrderItem-form.component';

// Bookauthor
import { BookauthorListComponent } from './entities/bookauthor/bookauthor-list/bookauthor-list.component';
import { BookauthorFormComponent } from './entities/bookauthor/bookauthor-form/bookauthor-form.component';

// Country
import { CountryListComponent } from './entities/country/country-list/country-list.component';
import { CountryFormComponent } from './entities/country/country-form/country-form.component';

// Customer
import { CustomerListComponent } from './entities/customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './entities/customer/customer-form/customer-form.component';

// Employee
import { EmployeeListComponent } from './entities/employee/employee-list/employee-list.component';
import { EmployeeFormComponent } from './entities/employee/employee-form/employee-form.component';

// EmployeeGroup
import { EmployeeGroupListComponent } from './entities/employeeGroup/employeeGroup-list/employeeGroup-list.component';
import { EmployeeGroupFormComponent } from './entities/employeeGroup/employeeGroup-form/employeeGroup-form.component';

// Publisher
import { PublisherListComponent } from './entities/publisher/publisher-list/publisher-list.component';
import { PublisherFormComponent } from './entities/publisher/publisher-form/publisher-form.component';

// Review
import { ReviewListComponent } from './entities/review/review-list/review-list.component';
import { ReviewFormComponent } from './entities/review/review-form/review-form.component';

// Shop
import { ShopListComponent } from './entities/shop/shop-list/shop-list.component';
import { ShopFormComponent } from './entities/shop/shop-form/shop-form.component';

// Synopsis
import { SynopsisListComponent } from './entities/synopsis/synopsis-list/synopsis-list.component';
import { SynopsisFormComponent } from './entities/synopsis/synopsis-form/synopsis-form.component';

// Workgroup
import { WorkgroupListComponent } from './entities/workgroup/workgroup-list/workgroup-list.component';
import { WorkgroupFormComponent } from './entities/workgroup/workgroup-form/workgroup-form.component';

export const routing = RouterModule.forRoot([
    { path: '', component: HomeListComponent, pathMatch: 'full' },
    { path: 'author-list', component: AuthorListComponent, pathMatch: 'full' },
    { path: 'author-form/:id', component: AuthorFormComponent, pathMatch: 'full' },
    { path: 'author-form', component: AuthorFormComponent, pathMatch: 'full' },
    { path: 'badge-list', component: BadgeListComponent, pathMatch: 'full' },
    { path: 'badge-form/:id', component: BadgeFormComponent, pathMatch: 'full' },
    { path: 'badge-form', component: BadgeFormComponent, pathMatch: 'full' },
    { path: 'book-list', component: BookListComponent, pathMatch: 'full' },
    { path: 'book-form/:id', component: BookFormComponent, pathMatch: 'full' },
    { path: 'book-form', component: BookFormComponent, pathMatch: 'full' },
    { path: 'bookOrder-list', component: BookOrderListComponent, pathMatch: 'full' },
    { path: 'bookOrder-form/:id', component: BookOrderFormComponent, pathMatch: 'full' },
    { path: 'bookOrder-form', component: BookOrderFormComponent, pathMatch: 'full' },
    { path: 'bookOrderItem-list', component: BookOrderItemListComponent, pathMatch: 'full' },
	{ path: 'bookOrderItem-form/:id1/:id2', component: BookOrderItemFormComponent, pathMatch: 'full' },
    { path: 'bookOrderItem-form', component: BookOrderItemFormComponent, pathMatch: 'full' },
    { path: 'bookauthor-list', component: BookauthorListComponent, pathMatch: 'full' },
    { path: 'bookauthor-form/:id', component: BookauthorFormComponent, pathMatch: 'full' },
    { path: 'bookauthor-form', component: BookauthorFormComponent, pathMatch: 'full' },
    { path: 'country-list', component: CountryListComponent, pathMatch: 'full' },
    { path: 'country-form/:id', component: CountryFormComponent, pathMatch: 'full' },
    { path: 'country-form', component: CountryFormComponent, pathMatch: 'full' },
    { path: 'customer-list', component: CustomerListComponent, pathMatch: 'full' },
    { path: 'customer-form/:id', component: CustomerFormComponent, pathMatch: 'full' },
    { path: 'customer-form', component: CustomerFormComponent, pathMatch: 'full' },
    { path: 'employee-list', component: EmployeeListComponent, pathMatch: 'full' },
    { path: 'employee-form/:id', component: EmployeeFormComponent, pathMatch: 'full' },
    { path: 'employee-form', component: EmployeeFormComponent, pathMatch: 'full' },
    { path: 'employeeGroup-list', component: EmployeeGroupListComponent, pathMatch: 'full' },
	{ path: 'employeeGroup-form/:id1/:id2', component: EmployeeGroupFormComponent, pathMatch: 'full' },
    { path: 'employeeGroup-form', component: EmployeeGroupFormComponent, pathMatch: 'full' },
    { path: 'publisher-list', component: PublisherListComponent, pathMatch: 'full' },
    { path: 'publisher-form/:id', component: PublisherFormComponent, pathMatch: 'full' },
    { path: 'publisher-form', component: PublisherFormComponent, pathMatch: 'full' },
    { path: 'review-list', component: ReviewListComponent, pathMatch: 'full' },
	{ path: 'review-form/:id1/:id2', component: ReviewFormComponent, pathMatch: 'full' },
    { path: 'review-form', component: ReviewFormComponent, pathMatch: 'full' },
    { path: 'shop-list', component: ShopListComponent, pathMatch: 'full' },
    { path: 'shop-form/:id', component: ShopFormComponent, pathMatch: 'full' },
    { path: 'shop-form', component: ShopFormComponent, pathMatch: 'full' },
    { path: 'synopsis-list', component: SynopsisListComponent, pathMatch: 'full' },
    { path: 'synopsis-form/:id', component: SynopsisFormComponent, pathMatch: 'full' },
    { path: 'synopsis-form', component: SynopsisFormComponent, pathMatch: 'full' },
    { path: 'workgroup-list', component: WorkgroupListComponent, pathMatch: 'full' },
    { path: 'workgroup-form/:id', component: WorkgroupFormComponent, pathMatch: 'full' },
    { path: 'workgroup-form', component: WorkgroupFormComponent, pathMatch: 'full' },
]);