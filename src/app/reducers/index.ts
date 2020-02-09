import { Currency } from '../models/currency.modal';
import {GridData} from '../models/grid.model';
import * as fromAmount from './amount';
import * as fromCurrency from './currency';
//import * as fromGridData from './gridData.reducer';
import * as fromTable from './table';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from "@angular/router";
import * as fromRouter from '@ngrx/router-store';
import {createFeatureSelector, ActionReducerMap } from "@ngrx/store";


export const reducers = {
    amount: fromAmount.reducer,
    fromCurr: fromAmount.reducerfromcurr,
    toCurr: fromAmount.reducertocurr,
    currencies: fromCurrency.reducer,
    query: fromCurrency.reducer,
    count : fromAmount.reducercount,
    tableData: fromTable.reducer
};

// selectors
export const getAmountState = (state: State) => state.amount;
export const getToCurrencyState = (state: State) => state.toCurr;
export const getFromCurrencyState = (state: State) => state.fromCurr;
export const getCountState = (state: State) => state.count;
export const getCurrencyRates = (state: State) => state.currencies;
export const getQuery = (state: State) => state.query;
//export const getGriddata = (state: State) => state.gridData;
export const getTabledata = (state: State) => state.tableData;

  export interface State {
    amount: number;
    count : number;
    fromCurr: string;
    toCurr: string;
    currencies: Currency[];
    query: any;
  //  gridData : GridData[];
    tableData: GridData[];

}

export interface RouterStateUrl{
  url : string;
  queryParams : Params;
  params : Params;
}

export interface RouteState{
  routerReducer : fromRouter.RouterReducerState<RouterStateUrl>
};

export const routereducers : ActionReducerMap<RouteState> = {
  routerReducer : fromRouter.routerReducer
};


export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');


export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl>{
  serialize(routerState: RouterStateSnapshot) : RouterStateUrl{
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state : ActivatedRouteSnapshot = routerState.root;
    while(state.firstChild){
      state = state.firstChild;
    }
    const { params } = state;

    return { url , queryParams, params};
  }
}
