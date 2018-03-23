import Angle from './angle-utils';

export default class GeometryUtils {

  /**
   * Given a sequence of segments defined by their angles and lengths,
   * calculates all the resulting vertices coordinates.
   * Assumes the first segment vertex position is (0,0)
   */
  static calculateVertices(segments: number[][]): number[][] {
    let vertices = [[0, 0]]; // Declare starting vertex.
    let previousVertex = vertices[0]; // Set the starting vertex at (0,0).
    let previousAngle = 0; // Set starting angle to 0.

    for (let i = 0; i < segments.length; ++i) {
      let relativeAngle = segments[i][0];
      let length = segments[i][1];
      let angle = relativeAngle + previousAngle;

      let _x = previousVertex[0];
      let _y = previousVertex[1];

      let nextVertex = [
        _x + length * Angle.cos(angle),
        _y + length * Angle.sin(angle),
      ];

      vertices.push(nextVertex);

      previousVertex = nextVertex;
      previousAngle = angle;
    }

    return vertices;
  }

  /**
   * Calculates the height and width of an imaginary boundary square that
   * contains all vertices.
   * @param {number[][]} points
   */
  static calculateBoundaryDimensions(points: number[][]): number[] {
    let verticesHorizontalCoordinates = points.map((vertex) => {
      return vertex[0];
    });
    let maxX = Math.max(...verticesHorizontalCoordinates);
    let minX = Math.min(...verticesHorizontalCoordinates);
    let boundaryWidth = maxX - minX;

    let verticesVerticalCoordinates = points.map((vertex) => {
      return vertex[1];
    });
    let maxY = Math.max(...verticesVerticalCoordinates);
    let minY = Math.min(...verticesVerticalCoordinates);
    let boundaryHeight = maxY - minY;

    return [boundaryWidth, boundaryHeight, minX, maxX, minY, maxY];
  }

  static rotatePoints(points: number[][], degrees: number = 90): number[][] {
    return points.map((point) => {
      let x = point[0];
      let y = point[1];
      return [
        x * Angle.cos(degrees) - y * Angle.sin(degrees),
        x * Angle.sin(degrees) + y * Angle.cos(degrees),
      ];
    });
  }

  static calculateBetterFittingScaleFactor(width: number,
                                           height: number,
                                           limitX: number,
                                           limitY: number): number {
    let factorA = 1 / (width / limitX); // Horizontal fit scale factor
    let factorB = 1 / (height / limitY); // Vertical fit scale factor

    if (!(factorA > 0 && factorB > 0)) {
      throw new Error('A scaling factor is expected to be a positive number');
    }

    if (factorA > 1 && factorB < 1) {
      // Between scaling down or up we choose to scale down, to avoid leaving
      // any part of the figure out of the canvas.
      return factorB;
    } else if (factorA < 1 && factorB > 1) {
      // Between scaling down or up we choose to scale down, to avoid leaving
      // any part of the figure out of the canvas.
      return factorA;
    } else if (factorA > 1 && factorB > 1) {
      // We need to scale up the figure so we return the lesser scale factor
      // to avoid overflowing the canvas.
      return (factorA > factorB) ? factorB : factorA;
    } else if (factorA < 1 && factorB < 1) {
      // We need to scale down the figure so we return the bigger scale factor
      // to avoid leaving any part of the figure out of the canvas.
      return (factorA > factorB) ? factorA : factorB;
    } else {
      // At this point any of the factors may be equal to 1 (no scale
      // transformation needed), so let's try to return the factor
      // that is not equal to 1 (if both are equal to 1 we will return 1).
      if (factorA !== 1.0) {
        return factorA;
      } else {
        return factorB;
      }
    }
  }

  static scalePoints(points: number[][], scaleFactor: number): number[][] {
    return points.map((point) => {
      let x = point[0];
      let y = point[1];
      return [
        x * scaleFactor,
        y * scaleFactor,
      ];
    });
  }

  static translatePointsToFirstQuadrant(points: number[][]): number[][] {
    let boundaryDimensions = GeometryUtils.calculateBoundaryDimensions(points);
    let boundaryHorizontalMin = boundaryDimensions[2];
    let boundaryVerticalMin = boundaryDimensions[4];

    // If the minimum horizontal boundary is negative,
    // we need to translate the figure towards the right (positive distance)
    // otherwise towards the left (negative distance).
    let horizontalTranslation = boundaryHorizontalMin < 0 ?
        Math.abs(boundaryHorizontalMin) : -Math.abs(boundaryHorizontalMin);

    // If the minimum vertical boundary is negative,
    // we need to translate the figure towards the top (positive distance)
    // otherwise towards the bottom (negative distance).
    let verticalTranslation = boundaryVerticalMin < 0 ?
        Math.abs(boundaryVerticalMin) : -Math.abs(boundaryVerticalMin);

    return points.map((point) => {
      return [
        point[0] + horizontalTranslation,
        point[1] + verticalTranslation,
      ];
    });
  }

  /**
   * Fit points within a limited area of the first quadrant.
   * Maintains aspect ratio.
   * @param {number[][]} points
   * @param {number} limitX
   * @param {number} limitY
   * @returns {number[][]}
   */
  static fitPointsToFirstQuadrantArea(points: number[][],
                                      limitX: number,
                                      limitY: number) {
    let boundaryDimensions = GeometryUtils.calculateBoundaryDimensions(points);
    let boundaryWidth = boundaryDimensions[0];
    let boundaryHeight = boundaryDimensions[1];

    let areaIsATallRectangle = limitX < limitY;
    let boundaryIsATallRectangle = boundaryWidth < boundaryHeight;
    if (areaIsATallRectangle !== boundaryIsATallRectangle) {
      points = GeometryUtils.rotatePoints(points, 90);
      // Recalculate boundaries after rotation transform
      boundaryDimensions = GeometryUtils.calculateBoundaryDimensions(points);
      boundaryWidth = boundaryDimensions[0];
      boundaryHeight = boundaryDimensions[1];
    }

    let scaleFactor = GeometryUtils.calculateBetterFittingScaleFactor(boundaryWidth, boundaryHeight, limitX, limitY);
    points = GeometryUtils.scalePoints(points, scaleFactor);

    points = GeometryUtils.translatePointsToFirstQuadrant(points);

    return points;
  }

  static fitSegmentsWithinFirstQuadrantArea(segments, limitX, limitY) {
    let vertices: number[][] = GeometryUtils.calculateVertices(segments);
    vertices = GeometryUtils.fitPointsToFirstQuadrantArea(vertices, limitX, limitY);
    return vertices;
  }
}
