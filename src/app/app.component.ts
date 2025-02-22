import { Component } from '@angular/core';
import { evaluate } from 'mathjs'; // imported to evaluate math expressions from string
import { OPERATORS } from './constants';
import { last } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  prevExp = "";

  currExp = "0";

  prevInput = "";

  result = 0;

  isEvaluated = true;

  whenPress($event: string) {

    // if $event is "="
    if ($event == "=" && this.prevInput != "=" && !OPERATORS.includes(this.prevInput)) {

      // evaluate result
      this.result = evaluate(this.currExp); // can use javascript eval() but apparently not recommended, might cause problems when bundling(?)

      // set prevInput as result
      this.prevInput = this.result.toString();

      // set prevExp as currExp
      this.prevExp = this.currExp;

      // set currExp as result
      this.currExp = this.result.toString();

      // toggle boolean
      this.isEvaluated = true;
    }

    // if $event is "AC"
    else if ($event == "AC") {
      this.prevExp = "";
      this.currExp = "0";
      this.prevInput = "";
      this.result = 0;
      this.isEvaluated = true;
    }

    // if $event is "C" -> Only do something if isEvaluated = FALSE
    else if ($event == "C" && !this.isEvaluated) {
      this.currExp = this.currExp.substring(0, this.currExp.length - 1);
      this.prevInput = this.currExp.charAt(this.currExp.length - 1);
      this.isEvaluated = false;

      if (this.currExp.length == 0) {
        this.currExp = "0";
        this.isEvaluated = true;
      }
    }

    // if $event is "." -> Only do something if prev is NOT "."
    else if ($event == "." && this.prevInput != ".") {

      // if prev input is an OPERATOR -> need add "0" in front of "."
      if (OPERATORS.includes(this.prevInput)) {
        this.currExp += "0" + $event;
      } 

      // check if there is an OPERATOR in between the last "." and this "." input
      //    if not u get 3.2.0 [X]
      let lastIdx = this.currExp.lastIndexOf(".");

      if (lastIdx >= 0 ) {
        let subStr = this.currExp.substring(lastIdx);

        // if there is an OPERATOR in between the last "." and this "." input => update as usual
        if (OPERATORS.some(c => subStr.includes(c))) {
          this.prevInput = $event;
          this.currExp += $event;
          this.isEvaluated = false;
        }
      }

      else {
        this.prevInput = $event;
        this.currExp += $event;
        this.isEvaluated = false;  
      }
    }

    // if $event is OPERATOR ["%", "/", "*", "+", "-"]
    else if (OPERATORS.includes($event)) {

      // if prev is OPERATOR -> overwrite the operator in currExp
      if (OPERATORS.includes(this.prevInput)) {
        this.currExp = this.currExp.substring(0, this.currExp.length - 1) + $event;
      }

      else {
        this.currExp += $event;
      }

      this.prevInput = $event;
      this.isEvaluated = false;
    }

    // if $event is digit (0 - 9)
    else if (parseInt($event) >= 0 && parseInt($event) <= 9) {

      // if just evaluated -> replace the result
      if (this.isEvaluated) {
        this.currExp = $event;
      }

      else {
        this.currExp += $event;
      }

      this.prevInput = $event;
      this.isEvaluated = false;
    }
  }
}
