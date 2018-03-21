import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-railing',
  templateUrl: './railing.component.html',
  styleUrls: ['./railing.component.css']
})
export class RailingComponent implements OnInit, OnChanges {
  @Input() code: string;
  segments: number[][];

  constructor() {
  }

  ngOnInit() {
    let parsedSegments = this.parseSegments(this.code);
    if (parsedSegments !== false) {
      console.log(parsedSegments);
      this.segments = parsedSegments;
    }
  }

  onCodeEdited(newCode) {
    let parsedSegments = this.parseSegments(newCode);
    if (parsedSegments !== false) {
      console.log(parsedSegments);
      this.segments = parsedSegments;
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    // changes.code.currentValue;
  }

  private parseSegments(code: string) {
    if (!code.startsWith('AQW#')) {
      console.log('Code must start with AQW#');
      return false;
    }
    if (!code.endsWith('#')) {
      console.log('Code must end with #');
      return false;
    }
    if (this.countCharacter('#', code) !== 2) {
      console.log('Code has more than two delimiter characters #');
      return false;
    }

    // This matcher pattern matches any number of substrings starting with @
    // and ending with @ or # (ending character not included in the substring)
    let segments = code.match(/@.+?(?=[@|#])/g);

    if (segments === null || segments.length < 1) {
      console.log('No valid segments declared. Segments must be defined with an angle and a length, eg. @45L150');
      return false;
    }

    let totalSegmentsLength = 0;
    let validatedSegments = [];
    for (let segment of segments) {
      // Remove starting @ and split by L
      let segmentInfo = segment.substring(1).split('L');

      if (segmentInfo.length !== 2) {
        console.log('Segment ' + segment + ' is not properly formatted. Segments must be defined with an angle and a length, eg. @45L150');
        // This segment has no information regarding its angle or its length
        return false;
      }

      if (!this.stringIsAnInteger(segmentInfo[0])) {
        console.log('Segment ' + segment + ' angle is not an integer. Segments must be defined with an integer angle, eg. @45');
        return false;
      }

      let segmentAngle = parseInt(segmentInfo[0], 10); // sexagesimal degrees
      if (segmentAngle < -165 || segmentAngle > 165) {
        console.log('Segment ' + segment + ' angle must be between -165 or 165, eg. @120.');
        return false;
      }

      if (!this.stringIsAnInteger(segmentInfo[1])) {
        console.log('Segment ' + segment + ' length is not an integer. Segments must be defined with an integer length, eg. L150');
        return false;
      }

      let segmentLength = parseInt(segmentInfo[1], 10); // cm
      if (segmentLength < 1) {
        console.log('Segment ' + segment + ' length must be a positive integer, eg. L23.');
        return false;
      }
      totalSegmentsLength += segmentLength;

      validatedSegments.push([segmentAngle, segmentLength]);
    }

    // Max total length allowed is 12 m (1200 cm)
    if (totalSegmentsLength >= 1200) {
      console.log('The sum of all segments length must be less than 12 meters (1200 cm)');
      return false;
    }

    return validatedSegments;
  }

  private stringIsAnInteger(str: string) {
    let rounded = Math.floor(Number(str));
    return rounded !== Infinity && String(rounded) === str;
  }

  private countCharacter(char: string, str: string) {
    return (str.match(new RegExp(char, 'g'))||[]).length
  }
}
