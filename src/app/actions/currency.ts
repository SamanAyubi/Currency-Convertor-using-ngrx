import { Action } from '@ngrx/store';
import { Currency } from '../models/currency.modal';
import {GridData} from '../models/grid.model';
import { Param } from '../models/param.model';
export const CURRENCIESUPDATE = '[ Currency ] UpdateAll';
export const CURRENCIESUPDATED = '[ Currency ] UpdatedAll';
export const QUERY_PARAM= '[ Query ] update';
export const GRID_DATA= '[ gridData ] update';

export class CurrenciesUpdateAction implements Action {
    type = CURRENCIESUPDATE;
}


export class QueryParamAction implements Action {
    type = QUERY_PARAM;
    constructor(public payload: any) {}
}
export class CurrenciesUpdatedAction implements Action {
    type = CURRENCIESUPDATED;

    constructor(public payload: Currency[]) {}
}

export class GridUpdatedAction implements Action {
    type = GRID_DATA;

    constructor(public payload: any) {}
}

export type Actions =  QueryParamAction | CurrenciesUpdatedAction | CurrenciesUpdateAction | GridUpdatedAction
