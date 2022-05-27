import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ClipboardModule} from "ngx-clipboard";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClipboardModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
