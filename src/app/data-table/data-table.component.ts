import { Component, OnInit, Input } from '@angular/core';
import {GLOBAL_CONST } from '../global-constants';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

@Input() dataSource ;

  displayedColumns: string[] = [];
  public itemCategory;

  columnNames= GLOBAL_CONST.TABLES.HISTORY_TABLE.TABLE_HEADER;

  constructor() { }

  ngOnInit() {
    this.displayedColumns = this.columnNames.map(x => x.id);

  }

}
