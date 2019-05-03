import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class RectangleService {
  constructor(private messageService: MessageService) {}

  getRectangle(): Observable<Hero[]> {
    var rawData = localStorage.getItem("myData");
    var data = JSON.parse(rawData);
    // this.data = data
    this.messageService.add("RectableService: fetched rectangles");
    return of(data != null ? data : []);
  }
}
