import { Action } from '@ngrx/store';
import { GridData } from '../models/grid.model';

export const TABLECHANGE = '[ Table ] Change';



export class TableChangeAction implements Action {
    type = TABLECHANGE;
    
    constructor(public payload:  GridData ) {}
   
}

