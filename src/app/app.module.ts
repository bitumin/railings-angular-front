import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Material theme
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material';
import { MatInputModule } from '@angular/material';


import { AppComponent } from './app.component';
import { RailingsListComponent } from './railings-list/railings-list.component';
import { RailingComponent } from './railing/railing.component';
import { CodeInputComponent } from './code-input/code-input.component';


@NgModule({
  declarations: [
    AppComponent,
    RailingsListComponent,
    RailingComponent,
    CodeInputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
