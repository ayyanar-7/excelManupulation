import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcelComponent } from './excel/excel.component';
import { HttpClientModule } from '@angular/common/http';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { ExcelJSComponent } from './excel-js/excel-js.component';

@NgModule({
  declarations: [
    AppComponent,
    ExcelComponent,
    HierarchyComponent,
    YoutubeComponent,
    ExcelJSComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
