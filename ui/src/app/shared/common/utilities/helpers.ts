export class Helpers {
  public static nullIf = (value) => {
    return value && String(value).trim().length !== 0 ? value : null;
  };
  public static getFirst = (array: any[]) => {
    return array && array?.length !== 0 ? array[0] : null;
  };
  public static capitalizeFirstLetter = (value: string) => {
    return (value || ``).trim().length === 0
      ? ``
      : value.charAt(0).toLocaleUpperCase() + value.slice(1);
  };
  public static jsonToArray = (json) => {
    if(!json) return [];
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
      result.push(json[key]);
    });
    return result;
  };
  public static hasItems = (array: any[]) => {
    return array && array?.length !== 0;
  };
  public static addIf(array: any[], item: any) {
    if (array && !array?.find((e) => e === item)) {
      array.push(item);
    }
  }
  public static removeIf(array: any[], item: any) {
    if (array) {
      const index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
  }
}
