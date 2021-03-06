import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeroFormComponent } from "./hero-form/hero-form.component";
import { AreaCalculatorComponent } from "./area-calculator/area-calculator.component";
import { MessagesComponent } from "./messages/messages.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SearchComponent } from "./search/search.component";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
  { path: "search", component: SearchComponent },
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeroFormComponent,
    AreaCalculatorComponent,
    MessagesComponent,
    SearchComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } //debug purposes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
