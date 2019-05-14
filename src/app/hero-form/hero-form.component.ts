import { Component, OnInit } from "@angular/core";
import { Rectangle } from "../hero";
import { RectangleService } from "../rectangle.service";
import { map, mergeMap } from "rxjs/operators";

@Component({
  selector: "app-hero-form",
  templateUrl: "./hero-form.component.html",
  styleUrls: ["./hero-form.component.less"]
})
export class HeroFormComponent implements OnInit {
  constructor(private rectangleService: RectangleService) {}

  model: Rectangle;
  lastSavedModel: Rectangle;

  submitted = false;

  // set data(value: Hero[]) {
  //   debugger;
  //   this.dataValue = value;
  // }

  // get data() {
  //   return this.dataValue;
  // }

  data: Rectangle[] = [];

  editElementId: number | undefined;

  ngOnInit() {
    this.getRectangles()
      .pipe(
        mergeMap(value =>
          this.getRectanglesFromBack().pipe(
            map(value2 => [...value, ...value2])
          )
        )
      )
      .subscribe(value => (this.data = value));

    // this.data = this.getLocalStorage();

    const lastHero = this.data[this.data.length - 1];

    const id = lastHero ? lastHero.id : 0;

    this.model = new Rectangle(id, "", 0, 0, "Feet", 0);
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  onAreaChange(value: number | null) {
    this.model.area = value;
  }
  onUnitChange(unit: string) {
    this.model.unit = unit;
  }
  onWidthChange(width: number | null) {
    this.model.width = width;
  }
  onLengthChange(length: number | null) {
    this.model.length = length;
  }

  onNameChange(name: string) {
    this.model.name = name;
  }

  saveChanges() {
    this.doOnSaveChanges(rectangle => {
      this.postLocalStorage(rectangle);
      this.postRectangles(rectangle);
    });
  }

  onSaveClick() {
    this.doOnSaveChanges(this.postRectangles);
  }

  onSaveClickToLs() {
    this.doOnSaveChanges(this.postLocalStorage);
  }

  postLocalStorage(newRectangle: Rectangle) {
    const data = JSON.parse(localStorage.getItem("myData"));

    const rectangles = data ? (JSON.parse(data) as Rectangle[]) : [];

    const rectanglesToSave = [...rectangles, newRectangle];

    localStorage.setItem("myData", JSON.stringify(rectanglesToSave));
  }

  // getLocalStorage() {
  //   var rawData = localStorage.getItem("myData");
  //   var data = JSON.parse(rawData);
  //   // this.data = data
  //   return data != null ? data : [];
  // }

  updateLocalStorage(d: Rectangle) {
    this.model = new Rectangle(d.id, d.name, d.width, d.length, d.unit, d.area);
    this.editElementId = d.id;
  }

  getRectangles = () => this.rectangleService.getRectangle();

  getRectanglesFromBack = () => this.rectangleService.getAllRectangles();

  postRectangles = (d: Rectangle) => {
    const newRectangle = new Rectangle(
      d.id,
      d.name,
      d.width,
      d.length,
      d.unit,
      d.area
    );
    this.rectangleService.postNewRectanglesToBack(newRectangle).subscribe(
      rectangleId => {
        newRectangle.id = rectangleId;
        this.data.push(newRectangle);
      },
      () => console.log("successfully added new rectangle")
    );
  };

  putRectangles = (d: Rectangle) => {
    const newRectangle = new Rectangle(
      d.id,
      d.name,
      d.width,
      d.length,
      d.unit,
      d.area
    );
    this.rectangleService.putNewRectanglesToBack(newRectangle).subscribe(
      rectangleId => {
        newRectangle.id = rectangleId;
        this.data.push(newRectangle);
      },
      () => console.log("successfully edited new rectangle")
    );
  };

  private doOnSaveChanges = (toExecute: (rect: Rectangle) => void) => {
    if (this.editElementId != undefined) {
      var updateElement = this.data.find(x => x.id == this.editElementId);
      updateElement.name = this.model.name;
      updateElement.length = this.model.length;
      updateElement.width = this.model.width;
      updateElement.unit = this.model.unit;
      this.editElementId = undefined;
      // this.putRectangles(this.model);
      // this.setLocalStorage(this.model);
    } else {
      this.submitted = true;
      this.model = new Rectangle(
        this.model.id,
        this.model.name,
        this.model.width,
        this.model.length,
        this.model.unit,
        this.model.area
      );
      this.data.push(this.model);

      toExecute(this.model);
    }

    this.lastSavedModel = this.model;
    this.model = new Rectangle(this.model.id + 1, "", 0, 0, "Feet", 0);
  };
}
