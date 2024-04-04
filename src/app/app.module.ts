import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { MainComponent } from './pages/main/main.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatTableModule,

    ReactiveFormsModule,
    FormsModule

  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
