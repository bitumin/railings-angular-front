import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-railing',
  templateUrl: './railing.component.html',
  styleUrls: ['./railing.component.css'],
})
export class RailingComponent implements OnInit {
  @Input() code: string;
  segments: number[][];

  constructor() {
  }

  ngOnInit() {
  }

  parseSegments(validCode) {
    let segments = validCode.match(/@.+?(?=[@|#])/g);
    return segments.map(function(segment) {
      let segmentInfo = segment.substring(1).split('L');
      let angle = parseInt(segmentInfo[0], 10);
      let length = parseInt(segmentInfo[1], 10);

      return [angle, length];
    });
  }

  onValidInputCode(validCode: string) {
    this.code = validCode;
    this.segments = this.parseSegments(validCode);
  }
}
