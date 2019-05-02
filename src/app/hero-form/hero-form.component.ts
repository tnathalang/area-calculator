import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { getLocaleNumberSymbol } from "@angular/common";
import { FormArray, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-hero-form",
  templateUrl: "./hero-form.component.html",
  styleUrls: ["./hero-form.component.less"]
})
export class HeroFormComponent implements OnInit {
  constructor() {}

  model: Hero;
  lastSavedModel: Hero;

  submitted = false;

  // set data(value: Hero[]) {
  //   debugger;
  //   this.dataValue = value;
  // }

  // get data() {
  //   return this.dataValue;
  // }

  data: Hero[] = [];

  editElementId: number | undefined;

  ngOnInit() {
    this.data = this.getLocalStorage();

    const lastHero = this.data[this.data.length - 1];

    const id = lastHero ? lastHero.id : 0;

    this.model = new Hero(id, "", 0, 0, "Feet", 0);
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

  onSaveClick() {
    if (this.editElementId != undefined) {
      var updateElement = this.data.find(x => x.id == this.editElementId);
      updateElement.name = this.model.name;
      updateElement.length = this.model.length;
      updateElement.width = this.model.width;
      updateElement.unit = this.model.unit;
      this.editElementId = undefined;
    } else {
      this.submitted = true;
      this.model = new Hero(
        this.model.id,
        this.model.name,
        this.model.width,
        this.model.length,
        this.model.unit,
        this.model.area
      );
      this.data.push(this.model);
    }
    this.setLocalStorage();

    this.lastSavedModel = this.model;
    this.model = new Hero(this.model.id + 1, "", 0, 0, "Feet", 0);
  }

  setLocalStorage() {
    localStorage.setItem("myData", JSON.stringify(this.data));
  }

  getLocalStorage() {
    var rawData = localStorage.getItem("myData");
    var data = JSON.parse(rawData);
    // this.data = data
    return data != null ? data : [];
  }

  updateLocalStorage(d: Hero) {
    this.model = new Hero(d.id, d.name, d.width, d.length, d.unit, d.area);
    this.editElementId = d.id;

    // var storedValues = localStorage.getItem("myData");
    // var shapesFromStorage = JSON.parse(storedValues);

    // able to modify the fields seperately

    // localStorage.setItem("myData", JSON.stringify(shapesFromStorage));
  }
}
