import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PaperScope, Path, Point, PointText, Project} from 'paper';

@Component({
  selector: 'app-railing',
  templateUrl: './railing.component.html',
  styleUrls: ['./railing.component.css'],
})
export class RailingComponent implements OnInit {
  @Input() code: string;
  scope: PaperScope;
  project: Project;
  segments: number[][];
  @ViewChild('canvasElement') canvasElement: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.scope = new PaperScope();
    this.project = new Project(this.canvasElement.nativeElement);
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
    this.updateSegmentsVisualization();
  }

  updateSegmentsVisualization() {
    console.log('Draw ', this.segments);

    this.project.activeLayer.removeChildren();

    let from = new Point(20, 80);
    let to = new Point(200, 100);
    let currentPath = new Path.Line(from, to);
    currentPath.strokeColor = 'black';
    this.project.activeLayer.addChild(currentPath);

    let text = new PointText(new Point(5, 20));
    text.justification = 'left';
    text.fillColor = 'black';
    text.content = this.code;
    this.project.activeLayer.addChild(text);
  }
}
