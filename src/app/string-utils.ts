export default class StringUtils {

  public static stringIsAnInteger(str: string) {
    let rounded = Math.floor(Number(str));
    return rounded !== Infinity && String(rounded) === str;
  }

  public static countCharacter(char: string, str: string) {
    return (str.match(new RegExp(char, 'g'))||[]).length
  }

}
