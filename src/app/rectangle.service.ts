import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RectangleService {
  constructor(private http: HttpClient) {}

  getRectangle(): Observable<Hero[]> {
    var rawData = localStorage.getItem("myData");
    var data = JSON.parse(rawData);
    // this.data = data
    // this.messageService.add("RectableService: fetched rectangles");
    return of(data != null ? data : []);
  }

  getAllRectangles(): Observable<Hero[]> {
    return this.http.get<Hero[]>("https://localhost:5001/api/areacalcultor");
  }
}
