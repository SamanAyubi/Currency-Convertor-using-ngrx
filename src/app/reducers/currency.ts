import { Currency } from '../models/currency.modal';
import * as currency from '../actions/currency';
import { CurrenciesUpdateAction, QueryParamAction } from '../actions/currency';

export function reducer(state = [], action: currency.QueryParamAction) {
    switch (action.type) {
      
        case currency.QUERY_PARAM:
            return action.payload;
         default:
             return state;
    }
}

