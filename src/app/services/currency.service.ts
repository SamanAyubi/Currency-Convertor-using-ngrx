import { HttpClient } from '@angular/common/http';
import { Currency } from '../models/currency.modal';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { GLOBAL_CONST } from '../global-constants';
import { map } from "rxjs/operators";




@Injectable()
export class CurrencyService {
    constructor(private http: HttpClient) {}

    getRates(a): Observable<Currency[]> {
      
        return this.http.get<any>(GLOBAL_CONST.API_URLS.CURRENCY_EXCHNGE_API_URL+a.id).pipe(map(result => {
            console.log('result',result);
            return Object.keys(result.rates).map((key, index) => {
                return { code: key, value: result.rates[key]};
            });
        }));
    }

  
}