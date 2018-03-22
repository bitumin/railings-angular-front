import {
  Component, OnInit, ViewChild, ElementRef, Input,
  OnChanges, SimpleChanges,
} from '@angular/core';
import { PaperScope, Project, Path, Point, PointText } from 'paper';

@Component({
  selector: 'app-geometry-visualizer',
  templateUrl: './geometry-visualizer.component.html',
  styleUrls: ['./geometry-visualizer.component.css']
})
export class GeometryVisualizerComponent implements OnInit, OnChanges {
  @Input() segments: Number[][];
  @Input() code: string;
  @ViewChild('canvasElement') canvasElement: ElementRef;
  scope: PaperScope;
  project: Project;

  constructor() {
  }

  ngOnInit() {
    this.scope = new PaperScope();
    this.project = new Project(this.canvasElement.nativeElement);

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.code.isFirstChange()) {
      // Init will take care of this.
      return;
    }

    this.project.activeLayer.removeChildren();

    let from = new Point(20, 80);
    let to = new Point(200, 100);
    let currentPath = new Path.Line(from, to);
    currentPath.strokeColor = 'black';
    this.project.activeLayer.addChild(currentPath);

    let text = new PointText(new Point(5, 20));
    text.justification = 'left';
    text.fillColor = 'black';
    text.content = changes.code.currentValue;
    this.project.activeLayer.addChild(text);
  }
}
