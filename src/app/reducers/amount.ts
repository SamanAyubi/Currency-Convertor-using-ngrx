import { ActionReducer, Action } from '@ngrx/store';
import * as amount from '../actions/amount';

export function reducer(state: number = 1, action: amount.AmountChangeAction) {
    switch (action.type) {
        case amount.AMOUNTCHANGE:
            return action.payload;
        default:
            return state;
    }
}

export function reducercount(state: number = 1, action: amount.CountChangeAction) {
    switch (action.type) {
        case amount.COUNTCHANGE:
            return action.payload;
        default:
            return state;
    }
}

export function reducerfromcurr(state: string = "", action: amount.FromCurrencyChangeAction) {
    switch (action.type) {
        case amount.FROMCURRENCYCHANGE:
            return action.payload;
        default:
            return state;
    }
}

export function reducertocurr(state: string = "", action: amount.ToCurrencyChangeAction) {
    switch (action.type) {
        case amount.TOCURRENCYCHANGE:
            return action.payload;
        default:
            return state;
    }
}
