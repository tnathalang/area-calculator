import { Injectable } from "@angular/core";
import { Rectangle } from "./hero";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  //provide root
  providedIn: "root"
})
export class RectangleService {
  constructor(private http: HttpClient) {}

  apiUrl = "https://localhost:5001/api/areacalcultor";

  getRectangle(): Observable<Rectangle[]> {
    var rawData = localStorage.getItem("myData");
    var data = JSON.parse(rawData);
    // this.data = data
    // this.messageService.add("RectableService: fetched rectangles");
    return of(data != null ? data : []);
  }

  getAllRectangles() {
    return this.http.get<Rectangle[]>(this.apiUrl);
  }

  postNewRectanglesToBack(rectangle: Rectangle) {
    return this.http.post<number>(this.apiUrl, rectangle);
  }

  putNewRectanglesToBack(rectangle: Rectangle) {
    return this.http.put<number>(this.apiUrl + rectangle.id, rectangle);
  }
}
