import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-railing',
  templateUrl: './railing.component.html',
  styleUrls: ['./railing.component.css']
})
export class RailingComponent implements OnInit, OnChanges {
  @Input() code: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    // On code property changed...
    // for (let propName in changes) {
    //   let changedProp = changes[propName];
    //   let to = JSON.stringify(changedProp.currentValue);
    //   if (!changedProp.isFirstChange()) {
    //     let from = JSON.stringify(changedProp.previousValue);
    //   }
    // }
  }
}
