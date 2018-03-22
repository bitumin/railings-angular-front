import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { codeValidator } from './code-validator.directive';

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.css']
})
export class CodeInputComponent implements OnInit {
  @Input() code: string;
  @Output() validatedCode: EventEmitter<string> = new EventEmitter<string>();
  codeInputForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.codeInputForm = new FormGroup({
      code: new FormControl(this.code, [
          codeValidator(-165, 165, 1200)
      ]),
    });
  }

  onCodeChanged(code: string, valid: boolean) {
    if (valid) {
      this.validatedCode.emit(code);
    }
  }
}
