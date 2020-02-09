import { Action } from '@ngrx/store';

export const AMOUNTCHANGE = '[ Amount ] Change';

export const FROMCURRENCYCHANGE = '[ FromCurrency ] Change';

export const TOCURRENCYCHANGE = '[ ToCurrency ] Change';

export const QUERY_PARAM = '[ Query_Param ] Change'

export const COUNTCHANGE = '[ Count ] Change'

export class AmountChangeAction implements Action {
    type = AMOUNTCHANGE;
    constructor(public payload: number) {}
}

export class CountChangeAction implements Action {
    type = COUNTCHANGE;
    constructor(public payload: number) {}
}

export class FromCurrencyChangeAction implements Action {
    type = FROMCURRENCYCHANGE;
    constructor(public payload: string) {}
}

export class ToCurrencyChangeAction implements Action {
    type = TOCURRENCYCHANGE;
    constructor(public payload: string) {}
}
