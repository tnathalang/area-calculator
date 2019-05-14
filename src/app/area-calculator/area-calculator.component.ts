import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges
} from "@angular/core";
import { Rectangle } from "../hero";

enum Unit {
  Feet = "Feet",
  Meter = "Meter"
}

@Component({
  selector: "app-area-calculator",
  templateUrl: "./area-calculator.component.html",
  styleUrls: ["./area-calculator.component.less"]
})
export class AreaCalculatorComponent {
  constructor() {}

  units = [Unit.Feet, Unit.Meter];

  checked = false;

  @Input()
  width: number;
  @Input()
  length: number;
  @Input()
  currentUnit = this.units[0];

  @Input()
  submitted = false;

  @Output()
  areaChange = new EventEmitter<number | null>();

  @Output()
  unitChange = new EventEmitter<Unit>();

  @Output()
  widthChange = new EventEmitter<number | undefined>();

  @Output()
  lengthChange = new EventEmitter<number | undefined>();

  @Output()
  saveClick = new EventEmitter();

  @Output()
  saveClickToLs = new EventEmitter();

  onSaveClick() {
    this.onChange();
    this.saveClick.emit();
  }

  onSaveClickToLS() {
    this.onChange();
    this.saveClickToLs.emit();
  }

  onChange = () => {
    if (this.width == null || this.length == null) {
      this.areaChange.emit(null);
      return;
    }

    const cal = this.width * this.length;
    this.areaChange.emit(cal);
  };

  onWidthChange = () => {
    this.widthChange.emit(this.width);
    this.onChange();
  };

  onLengthChange = () => {
    this.lengthChange.emit(this.length);
    this.onChange();
  };

  onUnitChange = () => {
    this.unitChange.emit(this.currentUnit);
  };

  checkBoxvalue(event) {
    this.checked = event.target.checked;
  }
}
