import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-buttons',
  standalone: false,
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {

  private _name= "";

  @Input()
  backgroundColor = "#353935";

  @Input()
  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  @Output()
  onPress = new Subject<string>;

  send() {
    console.info('>>>> button name: ', this._name);
    // Send the name of the button
    this.onPress.next(this._name);
  }

}
