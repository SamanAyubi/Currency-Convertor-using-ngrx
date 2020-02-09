import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { reducers, routereducers, CustomSerializer } from './reducers/index';
//import { reducers, routereducers, CustomSerializer } from './reducers/index';
import { CurrencyService } from './services/currency.service';
import { CurrencyEffects } from './effects/currencyEffect';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule,
RouterStateSerializer } from "@ngrx/router-store";
import { StoreModule } from '@ngrx/store';
import { RouterModule} from "@angular/router";
import { AppEffects } from './app.effects';
 import { FormsModule } from '@angular/forms';
 import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DisclaimerPageComponent } from './disclaimer-page/disclaimer-page.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DataTableComponent } from './data-table/data-table.component';
//import { routereducers, CustomSerializer} from './reducers/route';



@NgModule({
  declarations: [
    AppComponent,
    DisclaimerPageComponent,
    MainComponentComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CurrencyEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],

  entryComponents: [
    MainComponentComponent
  ],
  providers: [CurrencyService, {provide : RouterStateSerializer, useClass : CustomSerializer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
