export class Helpers {
    public static nullIf = (value) => {
        return (value && String(value).trim().length !== 0) ? value : null;
    }
    public static getFirst = (array: any[]) => {
      return (array && array?.length !== 0) ? array[0] : null;
    }
}
