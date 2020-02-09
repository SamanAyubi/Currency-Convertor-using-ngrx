import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { GLOBAL_CONST } from '../global-constants';

@Component({
  selector: 'app-disclaimer-page',
  templateUrl: './disclaimer-page.component.html',
  styleUrls: ['./disclaimer-page.component.scss']
})
export class DisclaimerPageComponent implements OnInit {


 public backText : string = GLOBAL_CONST.TEXTS.BUTTON;
 public disclaimerLabel: string =GLOBAL_CONST.TEXTS.DISCLAIMER_LABEL;
 public disclaimerText  = GLOBAL_CONST.TEXTS.DISCLAIMER_TEXT;


  constructor(private location:Location) { }

  ngOnInit() {
  }


  clickBack(){
    this.location.back();
  }
}
