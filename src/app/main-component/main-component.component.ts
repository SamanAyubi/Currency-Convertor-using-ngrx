
import { QueryParamAction  } from '../actions/currency';
import { GridData } from '../models/grid.model';
import { Param } from '../models/param.model';
import { Currency} from '../models/currency.modal'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AmountChangeAction, FromCurrencyChangeAction, ToCurrencyChangeAction, CountChangeAction } from '../actions/amount';
import { TableChangeAction} from '../actions/table';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CurrencyService } from '../services/currency.service'
import { Router, UrlSerializer } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';
import {formatDate } from '@angular/common';
import {GLOBAL_CONST } from '../global-constants';
import * as fromRoot from '../reducers';
import { Observable ,Subscription} from 'rxjs';
import { DataTableComponent } from '../data-table/data-table.component';




export interface CurrencyVal {
  value: string;
  viewValue: string;
}

export interface Element {
  from: string;
  position: number;
  to: string;
  date: string;
  time: string;
}


@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})



export class MainComponentComponent implements OnInit {
 

  end$: Observable<any>;
  objectForm: FormGroup;
  public amount$: Observable<number>;
  public currencyRates$: Observable<Currency[]>;
  public gridData$:  Observable<any>;
  public tableDat$: Observable<GridData[]>;
  public queryAmt$: Observable<Param>;
  public toVal$:Observable<string>;
  public fromVal$:Observable<string>;


  public dataQuery: string;
  public subscription: Subscription;
  public fromCurr: string;
  public toCurr$: Observable<string>;
  public fromCurr$: Observable<string>;
  public count$ : Observable<number>;
  public toCurr: string;
  public firstName : string;
  public tempArr = [];
  public  count : number= 0;
  public myData;
  public queryAmtVal: number;
  dataSource;
  myText: string;
  today= new Date();
  public tableArr: string
  todaysDataTime = '';
  todaydate = '';
  displayedColumns: string[] = [];
  public itemCategory;

  columnNames= GLOBAL_CONST.TABLES.HISTORY_TABLE.TABLE_HEADER;
  currency = GLOBAL_CONST.SELECT_VALUE.currency;

  public disclaimer : string = GLOBAL_CONST.TEXTS.DISCLAIMER_LABEL;
  public toAmountLabel : string = GLOBAL_CONST.TEXTS.TO_AMT_LABEL;
  public fromAmount : string = GLOBAL_CONST.TEXTS.FROM_AMT;
  public pageLabel : string =GLOBAL_CONST.TEXTS.CONVERTOR_LABEL;
  public historyHeader: string = GLOBAL_CONST.TEXTS.HISTORY_TABLE_HEADER;


  constructor(private currSer: CurrencyService,private router: Router, private serializer: UrlSerializer,public store: Store<fromRoot.State>) {
      this.amount$ = store.select(fromRoot.getAmountState);
      this.fromCurr$ = store.select(fromRoot.getFromCurrencyState);
      this.toCurr$ = store.select(fromRoot.getToCurrencyState);
      this.queryAmt$ = store.select(fromRoot.getQuery);
      this.tableDat$ = store.select(fromRoot.getTabledata);
      this.toVal$= store.select(fromRoot.getToCurrencyState);
      this.fromVal$= store.select(fromRoot.getFromCurrencyState);
      this.count$ = store.select(fromRoot.getCountState);

  }

  // Dispatch the Action
  ngOnInit() {
      this.createTable(this.tempArr);
      this.displayedColumns = this.columnNames.map(x => x.id);

  }


  onSelection(e, v){
    this.fromCurr = e.value;
    this.store.dispatch(new FromCurrencyChangeAction(this.fromCurr));
    this.store.dispatch(new CountChangeAction(this.count));
   }

   onSelection2(e, v){
    this.toCurr = e.value;
    this.store.dispatch(new ToCurrencyChangeAction( this.toCurr));
   }




 /**
 * Function to create query string from object
 * @param obj
 */
public createQuery(queryObject): string {
  let str = [];
  for (let p in queryObject) {
    if (queryObject.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(queryObject[p]));
    }
  }
  let queryString = str.join('&');
  return queryString;
}


 /**
 * Function to create datatable
 * @param obj
 */
  createTable(tempArr) {
    this.store.select(state => state).subscribe(data => {
      let tableArr = data.tableData;
      this.dataSource = tableArr;
    });

    }

  /**
 * Function to allow only number as input
 * @param obj
 */
    public isNumberKey(evt){
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57)))
          return false;
      return true;
  }
 /**
 * Navigation to Disclaimer Page.
 *
 */
  click(){
    this.router.navigate(['/disclaimer']);
  }



/**
 * Main function dispatching the values after amount is entered to be converted.
 *
 */
  onAmountChange(amount: string) {

    this.subscription = this.toVal$.subscribe(data =>{
      this.toCurr= data;
      console.log('this.toVal$',data);
    });

    this.subscription = this.fromVal$.subscribe(data =>{
      this.fromCurr= data;
      console.log('this.toVal$',data);
    });

    this.subscription = this.count$.subscribe(data =>{
      this.count= data;
      console.log('this.count$',data);
    });

    this.count = this.count +1;
    let queryParams = { base: this.fromCurr, symbols: this.toCurr };
    this.dataQuery = '?' + this.createQuery(queryParams);

  // If both the dropdown selected then start dispatching.
      if(this.fromCurr && this.toCurr){
      this.store.dispatch(new QueryParamAction({id: this.dataQuery}));
      this.store.dispatch(new FromCurrencyChangeAction(this.fromCurr));
      this.store.dispatch(new ToCurrencyChangeAction( this.toCurr));
      this.store.dispatch(new CountChangeAction(this.count));


      const number = parseFloat(amount);
      if (!isNaN(number)) {this.store.dispatch(new AmountChangeAction(number));
      }

      this.todaysDataTime = formatDate(this.today, 'hh:mm:ss', 'en-US', '+0530');
      this.todaydate = formatDate(new Date(), 'dd/MM/yyyy', 'en');

      this.itemCategory = [{position : Number(''),from:'',to:'', date:'', time:''}];

      this.store.select(state => state.fromCurr).subscribe(data => {
        this.fromCurr= data;

      });

      this.store.select(state => state.toCurr).subscribe(data => {
        this.toCurr= data;

      });

      //Dispatching values for the History Table
      this.store.dispatch(new TableChangeAction({position : this.count, from:this.fromCurr+' : '+amount, to:this.toCurr, date: this.todaydate, time:this.todaysDataTime}));

      this.tempArr.push(this.itemCategory);

      this.myData = Object.keys(this.itemCategory).map(key => {
        return this.itemCategory[key];
    })
        //calling the create table method.
      this.createTable(this.tempArr);
}
else{
// write validation code here, to diplay red border in dropdown and error message
}
  }


  /**
 * OnDestroy method to unsubscribe from all the existing subcription before the component is detroyed.
 *
 */
  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
