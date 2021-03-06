// File generated by Telosys Tools Generator ( version 3.0.0 ) - Date 2018-01-15 ( Time 16:52:43 )

import { GenericService } from './../../../services/generic.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Shop } from '../shop.model';
import { Configuration } from '../../../app.configuration';

@Injectable()
export class ShopService extends GenericService<Shop>  {

    /**
     * Constructor
     * @param _http Http
     * @param _configuration Configuration
     */
    constructor(_http: Http, _configuration: Configuration) {
        super(_http, _configuration, 'shop/');
    }

}
