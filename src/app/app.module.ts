import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayComponent } from './components/display/display.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule, MaterialModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
