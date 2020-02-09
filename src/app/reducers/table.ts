import { ActionReducer, Action } from '@ngrx/store';
import * as table from '../actions/table';
import { GridData} from '../models/grid.model';


export interface State {
    tableData: GridData[];

  }

  export const initialState: State = {
    tableData: [],

  };

export function reducer(state=[initialState], action: table.TableChangeAction) {
        switch (action.type) {
            case table.TABLECHANGE:
                console.log('action.payload1',action.payload);
                return [...state, action.payload];
             default:
                 return state;
        }

    }
