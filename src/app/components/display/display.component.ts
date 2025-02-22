import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {

  @Input()
  prevExpression: string = "";

  @Input()
  currExpression: string = "";

}
