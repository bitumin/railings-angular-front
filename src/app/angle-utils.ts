export default class AngleUtils {
  public static sin(sexagesimalDegrees) {
    return Math.sin(this.toRadians(sexagesimalDegrees));
  }

  public static cos(sexagesimalDegrees) {
    return Math.cos(this.toRadians(sexagesimalDegrees));
  }

  public static toRadians(sexagesimalDegrees) {
    return sexagesimalDegrees * Math.PI / 180;
  }
}
