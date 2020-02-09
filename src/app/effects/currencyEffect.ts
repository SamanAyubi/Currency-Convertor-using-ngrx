import { Injectable } from '@angular/core';
import { QueryParamAction } from './../actions/currency';
import { CurrencyService } from './../services/currency.service';
import { Observable } from 'rxjs';
import { pipe } from 'rxjs';
import { switchMap, map} from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as currency from '../actions/currency';

@Injectable()
export class CurrencyEffects {
    @Effect()
    update$: Observable<Action> = this.action$.
   pipe(
        ofType<currency.QueryParamAction>(currency.QUERY_PARAM),
        switchMap((action) => this.currencyService
                            .getRates(action.payload)
                            .pipe(
                            map(data => {
                                console.log('currservicelog',data);
                               return new QueryParamAction(data);
                            }
                            )
        )
));

    constructor(
        private currencyService: CurrencyService,
        private action$: Actions
    ) {}
}