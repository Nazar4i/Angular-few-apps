import { KanbanModule } from './kanban-app/kanban.module';
import { CalculatorModule } from './calculator-app/calculator.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteModule } from './note-app/note.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NoteModule,
    CalculatorModule,
    KanbanModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
