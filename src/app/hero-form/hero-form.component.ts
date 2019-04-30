import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";

@Component({
  selector: "app-hero-form",
  templateUrl: "./hero-form.component.html",
  styleUrls: ["./hero-form.component.less"]
})
export class HeroFormComponent implements OnInit {
  constructor() {}

  model = new Hero(18, "Area Calculator", 0, 0, "", 0);

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  areaValue: number | null;
  unitValue: string | undefined;
  widthValue: number | null;
  lengthValue: number | null;
  nameValue: string | undefined;

  ngOnInit() {}

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
    this.model.id += 1;
    this.model.area = this.areaValue;
    this.model.length = this.lengthValue;
    this.model.width = this.widthValue;
    this.model.unit = this.unitValue;
  }
}
