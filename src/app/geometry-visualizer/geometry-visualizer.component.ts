import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { PaperScope, Project, Path, Point } from 'paper';

@Component({
  selector: 'app-geometry-visualizer',
  templateUrl: './geometry-visualizer.component.html',
  styleUrls: ['./geometry-visualizer.component.css']
})
export class GeometryVisualizerComponent implements OnInit {
  @Input() segments: Number[][];
  @ViewChild('canvasElement') canvasElement: ElementRef;
  scope: PaperScope;
  project: Project;

  constructor() {
  }

  ngOnInit() {
    this.scope = new PaperScope();
    this.project = new Project(this.canvasElement.nativeElement);
  }

  updateSegmentsVisualization(segments) {
    this.project.activeLayer.removeChildren();

    let from = new Point(20, 80);
    let to = new Point(200, 100);
    let currentPath = new Path.Line(from, to);
    currentPath.strokeColor = 'black';
    this.project.activeLayer.addChild(currentPath);
  }

}
