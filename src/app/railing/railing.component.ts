import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PaperScope, Path, Point, PointText, Project} from 'paper';
import Geometry from '../geometry-utils';

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
  private canvasHeight: number;
  private canvasWidth: number;

  constructor() {
  }

  ngOnInit() {
    this.scope = new PaperScope();
    this.project = new Project(this.canvasElement.nativeElement);
    this.canvasHeight = this.canvasElement.nativeElement.offsetHeight;
    this.canvasWidth = this.canvasElement.nativeElement.offsetWidth;
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
    this.project.activeLayer.removeChildren();
    let vertices = Geometry.fitSegmentsWithinFirstQuadrantArea(this.segments, this.canvasWidth, this.canvasHeight);
    this.renderLabel();
    this.renderSegmentsFromVertices(vertices);
  }

  private renderSegmentsFromVertices(vertices: number[][]) {
    let from = new Point(vertices[0][0], vertices[0][1]);
    for (let i = 1; i < vertices.length; ++i) {
      let to = new Point(vertices[i][0], vertices[i][1]);
      let currentPath = new Path.Line(from, to);
      currentPath.strokeColor = '#4001c8';
      currentPath.strokeWidth = 5;
      this.project.activeLayer.addChild(currentPath);

      if (typeof vertices[i+1] !== 'undefined') {
        from = new Point(vertices[i][0], vertices[i][1]);
      }
    }
  }

  private renderLabel() {
    let text = new PointText(new Point(5, 10));
    text.justification = 'left';
    text.fillColor = 'black';
    text.content = this.code;
    this.project.activeLayer.addChild(text);
  }
}
