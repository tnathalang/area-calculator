import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeroFormComponent } from "./hero-form/hero-form.component";
import { AreaCalculatorComponent } from "./area-calculator/area-calculator.component";
import { MessagesComponent } from "./messages/messages.component";

@NgModule({
  declarations: [
    AppComponent,
    HeroFormComponent,
    AreaCalculatorComponent,
    MessagesComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
