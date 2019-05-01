import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { getLocaleNumberSymbol } from "@angular/common";

@Component({
  selector: "app-hero-form",
  templateUrl: "./hero-form.component.html",
  styleUrls: ["./hero-form.component.less"]
})
export class HeroFormComponent implements OnInit {
  constructor() {}

  model = new Hero(18, "Area Calculator", 0, 0, "Feet", 0);

  submitted = false;

  data: Hero[] = [];

  areaValue: number | null;
  unitValue: string | undefined = "Feet";
  widthValue: number | null;
  lengthValue: number | null;
  nameValue: string | undefined;

  private displayBoxInput = false;

  ngOnInit() {
    this.data = this.getLocalStorage();
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  onAreaChange(value: number | null) {
    this.areaValue = value;
  }
  onUnitChange(unit: string) {
    this.unitValue = unit;
  }
  onWidthChange(width: number | null) {
    this.widthValue = width;
  }
  onLengthChange(length: number | null) {
    this.lengthValue = length;
  }

  onNameChange(name: string) {
    this.nameValue = name;
  }

  onSaveClick() {
    this.submitted = true;
    this.model.id += 1;
    this.model.name = this.nameValue;
    this.model.area = this.areaValue;
    this.model.length = this.lengthValue;
    this.model.width = this.widthValue;
    this.model.unit = this.unitValue;
    this.setLocalStorage();
    this.model = new Hero(this.model.id, "", 0, 0, "Feet", 0);
  }

  setLocalStorage() {
    this.data.push(this.model);
    localStorage.setItem("myData", JSON.stringify(this.data));
  }

  getLocalStorage() {
    var rawData = localStorage.getItem("myData");
    var data = JSON.parse(rawData);
    // this.data = data
    return data;
  }

  inputBox() {
    this.displayBoxInput = true;
  }
}
