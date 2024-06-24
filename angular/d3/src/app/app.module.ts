import { NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { D3TreeComponent } from './d3-tree/d3-tree.component';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from "ng-apexcharts";
import { PieTreeComponent } from './pie-tree/pie-tree.component';
import { CounterComponent } from './viewchild/counter/Counter.Component';
import {ViewchildComponent} from  './viewchild/viewchild.component';

@NgModule({
  declarations: [
    
    ViewchildComponent,
    AppComponent,
    D3TreeComponent,
    PieTreeComponent,
    CounterComponent,
    
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgApexchartsModule,

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
