import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { bovinoDetailsComponent } from './bovinos/bovino-details/bovino-details.component';
import { bovinoListComponent} from './bovinos/bovino-list/bovino-list.component';

@NgModule({
  declarations: [
    AppComponent,
    bovinoDetailsComponent,
    bovinoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
